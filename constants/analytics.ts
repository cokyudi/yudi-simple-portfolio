import { sendGTMEvent } from '@next/third-parties/google';
import type { Language } from '@/constants/i18n';

/**
 * GA4 breaks these events down by parameter value, so the vocabulary is typed
 * rather than free strings: a typo like 'blog-post' would silently split a
 * metric across two buckets with nothing to catch it.
 *
 * Conversions (`cv_download`, `contact_click`) are the events flagged as key
 * events in GA4. The rest are engagement or navigation and must NOT be flagged
 * — `chat_message` fires once per user turn, so flagging it inflates the
 * conversion count several times over for a single conversation.
 */

/**
 * GTM's data layer is a merged state: a key keeps its last pushed value until
 * something overwrites it, and the one GA4 tag reads every key on every event.
 * So each push resets the keys it doesn't use — otherwise a link click after a
 * chat toggle reports `label: 'close'`, and `cv_download` inherits the
 * `section` of the `ui_click` fired by the same click. Mirrors the Data Layer
 * Variables in `gtm/site-events.json`.
 */
const EMPTY = {
  location: undefined,
  lang: undefined,
  method: undefined,
  slug: undefined,
  turn: undefined,
  section: undefined,
  element: undefined,
  label: undefined,
  link_url: undefined,
};

const push = (payload: { event: string } & Partial<Record<keyof typeof EMPTY, unknown>>) =>
  sendGTMEvent({ ...EMPTY, ...payload });

/** Where on the site a conversion happened. */
export type ConversionLocation = 'hero' | 'footer' | 'footer_cta' | 'blog_post';

/** Which contact channel the visitor opened. */
export type ContactMethod = 'email' | 'linkedin' | 'github';

/** Which entry point sent the visitor into the blog. */
export type BlogEntryPoint = 'hero' | 'home_featured' | 'home_view_all';

/** Conversion: the visitor downloaded a CV. */
export const trackCvDownload = (location: ConversionLocation, lang: Language) =>
  push({ event: 'cv_download', location, lang });

/** Conversion: the visitor opened a contact channel. */
export const trackContactClick = (
  method: ContactMethod,
  location?: ConversionLocation,
) => push({ event: 'contact_click', method, location });

/** Navigation, not a conversion: the visitor entered the blog. */
export const trackBlogClick = (location: BlogEntryPoint, slug?: string) =>
  push({ event: 'blog_click', location, slug });

/** Engagement, not a conversion: fires once per user turn in the assistant. */
export const trackChatMessage = (turn: number) => push({ event: 'chat_message', turn });

/**
 * Click map: every link or button click is reported as one `ui_click`, so the
 * whole site is covered without an onClick per element. Containers name the
 * part of the page with `data-section`; a control only needs `data-track` when
 * its href doesn't already say what it is (buttons, mostly). Engagement, not a
 * conversion — conversions keep their own events above, and fire alongside.
 */
export type TrackSection =
  | 'nav'
  | 'hero'
  | 'experience'
  | 'projects'
  | 'latest_post'
  | 'blog_index'
  | 'post_toc'
  | 'post_body'
  | 'related_posts'
  | 'contact_cta'
  | 'footer'
  | 'chat'
  | 'uses';

/** Named controls; anything unnamed reports as `link` or `button`. */
export type TrackElement =
  | 'language_toggle'
  | 'theme_toggle'
  | 'chat_toggle'
  | 'chat_close'
  | 'chat_suggestion'
  | 'chat_send';

export const trackSection = (section: TrackSection) => ({ 'data-section': section });

export const trackElement = (element: TrackElement, label?: string) => ({
  'data-track': element,
  ...(label && { 'data-label': label }),
});

/** What a click on `target` reports, or null if it didn't hit a link or button. */
export const clickPayload = (target: Element) => {
  const control = target.closest<HTMLElement>('a, button');
  if (!control) return null;
  const { track, label } = control.dataset;
  const href = control.getAttribute('href');
  return {
    event: 'ui_click',
    section: control.closest<HTMLElement>('[data-section]')?.dataset.section ?? 'other',
    element: track ?? (control.tagName === 'A' ? 'link' : 'button'),
    ...(label && { label }),
    ...(href && { link_url: href }),
    lang: document.documentElement.lang,
  };
};

/** Sends a `ui_click` for every link/button click on the page. Returns the cleanup. */
export const listenForClicks = () => {
  const onClick = (event: MouseEvent) => {
    const payload = event.target instanceof Element && clickPayload(event.target);
    if (payload) push(payload);
  };
  document.addEventListener('click', onClick, { capture: true });
  return () => document.removeEventListener('click', onClick, { capture: true });
};
