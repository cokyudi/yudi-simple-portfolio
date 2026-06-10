/**
 * Loads a Google Font as an ArrayBuffer for use with `next/og` (satori).
 * Fetching without a browser User-Agent returns a TTF, which satori can parse.
 * Pass `text` to subset the font (used for dynamic / CJK titles).
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
  text?: string,
): Promise<ArrayBuffer> {
  const params = new URLSearchParams({ family: `${family}:wght@${weight}` });
  if (text) params.set('text', text);

  const cssUrl = `https://fonts.googleapis.com/css2?${params.toString()}`;
  const css = await (await fetch(cssUrl)).text();
  const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!resource) throw new Error(`Failed to resolve font: ${family} ${weight}`);

  const res = await fetch(resource[1]);
  if (!res.ok) throw new Error(`Failed to fetch font file: ${family} ${weight}`);
  return res.arrayBuffer();
}
