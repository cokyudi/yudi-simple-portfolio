// Builds public/images/chat-avatar.svg — the blink sprite on the chat toggle.
//
//   npm i -D potrace && node scripts/build-chat-avatar.mjs
//
// potrace is deliberately NOT a declared dependency: it pulls in Jimp, which is
// a lot of install surface for a script that regenerates an asset already
// committed to the repo. Install it for the one-off run, then drop it again.
//
// Input is art/chat-avatar-source.png, one row lifted from an AI-generated
// expression sheet. Two problems with that source drive everything below.
//
// 1. The frames are NOT registered: heads differ in size and position, so
//    playing them raw reads as a jittering blob. Registration is enforced here
//    rather than trusted to the generator — every head is segmented, scaled by
//    one shared factor and pinned to a common baseline.
//
// 2. The heads are only ~91x99px, so any raster export is resolution-bound and
//    goes soft on a 2x/3x display. The art is flat line work, so it is traced
//    to vector instead and stays sharp at any size.
//
// The source row also carries the sheet's frame numbers below each chin and
// sits on the cream page colour rather than transparency; both are removed.

import sharp from 'sharp';
import potrace from 'potrace';
import { writeFileSync } from 'node:fs';

const SRC = 'art/chat-avatar-source.png';
const DEST = 'public/images/chat-avatar.svg';

const DARK = 140; // greyscale below this counts as ink (hair + outlines)
const HAIR_BAND = 70; // rows above any frame number, used to segment columns
const UP = 4; // upscale before tracing, so potrace fits smoother contours
const CELL = 96; // SVG units per frame

const SKIN = '#f7e7c6';
const INK = '#2f2f2f';
const BLUSH = '#e8968c';

// Frames 5-8 of the source row are effectively a different face — white sclera
// instead of solid eyes, and a nose appears — so only the consistent 1-4 are
// used, ordered as a there-and-back blink. First and last are the same frame so
// the loop back to the idle hold cannot pop.
const FRAMES = [0, 2, 3, 2, 0];

// ---------------------------------------------------------------- segmentation

const { data, info } = await sharp(SRC).greyscale().raw().toBuffer({ resolveWithObject: true });
const at = (x, y) => data[y * info.width + x];

// Segment heads by column ink profile. The row's spacing is irregular, so an
// even grid division cuts heads in half; only the hair band is scanned because
// the frame numbers below would otherwise bridge the gaps between heads.
const col = new Array(info.width).fill(0);
for (let y = 0; y < HAIR_BAND; y++)
  for (let x = 0; x < info.width; x++) if (at(x, y) < DARK) col[x]++;

const runs = [];
for (let x = 0; x < info.width; x++) {
  if (col[x] < 2) continue;
  const start = x;
  while (x < info.width && col[x] >= 2) x++;
  if (x - start > 30) runs.push([start, x - 1]); // ignore specks
}
if (runs.length < Math.max(...FRAMES) + 1) {
  throw new Error(`segmented only ${runs.length} heads in ${SRC}; expected at least ${Math.max(...FRAMES) + 1}`);
}

// Vertical extent per head: walk down from the hair and stop at the first gap.
// The gap is the whitespace between the chin and the frame number below it, so
// stopping there drops the number without clipping the chin.
const rowHasInk = (y, x0, x1) => {
  for (let x = x0; x <= x1; x++) if (at(x, y) < DARK) return true;
  return false;
};
const rawBoxes = runs.map(([x0, x1]) => {
  let y0 = 0;
  while (y0 < info.height && !rowHasInk(y0, x0, x1)) y0++;
  let y1 = y0;
  for (let y = y0, gap = 0; y < info.height; y++) {
    if (rowHasInk(y, x0, x1)) { y1 = y; gap = 0; } else if (++gap >= 3) break;
  }
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
});

// One box for every frame — this is what actually registers them.
const top = Math.max(...rawBoxes.map((b) => b.top));
const height = Math.min(...rawBoxes.map((b) => b.top + b.height)) - top;
const width = Math.max(...rawBoxes.map((b) => b.width));
const boxes = rawBoxes.map((b) => ({ left: b.left + ((b.width - width) >> 1), top, width, height }));

// ---------------------------------------------------------------- tracing

const trace = (mask) =>
  new Promise((resolve, reject) => {
    potrace.trace(
      mask,
      { threshold: 128, turdSize: 8, alphaMax: 1, optCurve: true, optTolerance: 0.45 },
      (err, svg) =>
        err
          ? reject(err)
          : resolve(
              [...svg.matchAll(/ d="([^"]+)"/g)]
                .map((m) => m[1])
                .join(' ')
                // 1dp is well past what 96 units of output can show, and this
                // roughly halves the file.
                .replace(/-?\d+\.\d+/g, (v) => String(Math.round(v * 10) / 10)),
            ),
    );
  });

const buildFrame = async (box) => {
  const w = box.width * UP;
  const h = box.height * UP;
  // median() before the resize: the sheet was generated as JPEG, so the flat
  // black hair carries compression speckle. A median is edge-preserving, so it
  // flattens the speckle without softening the line art the way a blur does.
  const { data: px, info: img } = await sharp(SRC)
    .extract(box)
    .median(3)
    .resize(w, h, { kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const n = img.width * img.height;
  const bg = [px[0], px[1], px[2]];
  const dist = (o) => Math.max(Math.abs(px[o] - bg[0]), Math.abs(px[o + 1] - bg[1]), Math.abs(px[o + 2] - bg[2]));
  const lum = (p) => 0.299 * px[p * 4] + 0.587 * px[p * 4 + 1] + 0.114 * px[p * 4 + 2];

  // The drawing is fully enclosed by dark outlines, so a flood fill inward from
  // the border finds the page and stops at the art — a plain colour key would
  // eat the face, whose peach sits close to the cream page.
  const outside = new Uint8Array(n);
  const stack = [];
  for (let x = 0; x < img.width; x++) stack.push(x, (img.height - 1) * img.width + x);
  for (let y = 0; y < img.height; y++) stack.push(y * img.width, y * img.width + img.width - 1);
  while (stack.length) {
    const p = stack.pop();
    if (outside[p] || dist(p * 4) > 70) continue;
    outside[p] = 1;
    const x = p % img.width;
    const y = (p / img.width) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < img.width - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - img.width);
    if (y < img.height - 1) stack.push(p + img.width);
  }

  // Keep only the largest connected inside-region. The crop clips the neck, and
  // the leftover stubs below the chin read as debris once traced.
  const head = new Uint8Array(n);
  const label = new Int32Array(n).fill(-1);
  let best = -1;
  let bestSize = 0;
  for (let seed = 0, id = 0; seed < n; seed++) {
    if (label[seed] !== -1 || outside[seed]) continue;
    const queue = [seed];
    label[seed] = id;
    let size = 0;
    while (queue.length) {
      const p = queue.pop();
      size++;
      const x = p % img.width;
      const y = (p / img.width) | 0;
      const nbrs = [
        x > 0 ? p - 1 : -1,
        x < img.width - 1 ? p + 1 : -1,
        y > 0 ? p - img.width : -1,
        y < img.height - 1 ? p + img.width : -1,
      ];
      for (const nb of nbrs) {
        if (nb >= 0 && label[nb] === -1 && !outside[nb]) { label[nb] = id; queue.push(nb); }
      }
    }
    if (size > bestSize) { bestSize = size; best = id; }
    id++;
  }
  for (let p = 0; p < n; p++) if (label[p] === best) head[p] = 1;

  const mask = (test) => {
    const m = Buffer.alloc(n, 255);
    for (let p = 0; p < n; p++) if (test(p)) m[p] = 0; // potrace traces black
    return sharp(m, { raw: { width: img.width, height: img.height, channels: 1 } }).png().toBuffer();
  };

  const [silhouette, ink] = await Promise.all([
    trace(await mask((p) => head[p])),
    trace(await mask((p) => head[p] && lum(p) < 150)),
  ]);
  return { silhouette, ink, w, h };
};

// ---------------------------------------------------------------- compose

const unique = [...new Set(FRAMES)];
const built = new Map();
for (const i of unique) built.set(i, await buildFrame(boxes[i]));

const first = built.get(FRAMES[0]);
const scale = Math.min((CELL * 0.96) / first.w, (CELL * 0.96) / first.h);
const dx = (CELL - first.w * scale) / 2;
const dy = CELL - first.h * scale;

// The blush is too faint in the source to separate from skin by colour, so it
// is drawn rather than traced — its centre was measured off the source (0.214 /
// 0.760 across, 0.625 down) and is identical in every frame.
const blush = (f, cx) =>
  `<ellipse cx="${(cx * f.w).toFixed(1)}" cy="${(0.625 * f.h).toFixed(1)}" rx="${(0.082 * f.w).toFixed(1)}" ry="${(0.045 * f.h).toFixed(1)}" fill="${BLUSH}" opacity=".5"/>`;

// The blink runs there and back, so each distinct drawing is defined once and
// referenced — roughly half the bytes of inlining all five.
const defs = unique
  .map((i) => {
    const f = built.get(i);
    return `<g id="f${i}"><path fill-rule="evenodd" d="${f.silhouette}" fill="${SKIN}"/>${blush(f, 0.214)}${blush(f, 0.76)}<path fill-rule="evenodd" d="${f.ink}" fill="${INK}"/></g>`;
  })
  .join('');

const uses = FRAMES.map(
  (srcIndex, i) =>
    `<use href="#f${srcIndex}" transform="translate(${(i * CELL + dx).toFixed(2)} ${dy.toFixed(2)}) scale(${scale.toFixed(5)})"/>`,
).join('');

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CELL * FRAMES.length} ${CELL}" width="${CELL * FRAMES.length}" height="${CELL}">` +
  `<defs>${defs}</defs>${uses}</svg>\n`;

writeFileSync(DEST, svg);

// The CSS sizes the strip in percentages (background-size: <frames * 100>% 100%),
// so changing FRAMES.length means updating .chat-avatar in styles/globals.css.
console.log(
  `${DEST}: ${FRAMES.length} frames (${unique.length} unique), ${Math.round(svg.length / 1024)}KB, source heads ${width}x${height}`,
);
