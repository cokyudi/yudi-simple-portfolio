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

/** Where on the site a conversion happened. */
export type ConversionLocation = 'hero' | 'footer' | 'footer_cta' | 'blog_post';

/** Which contact channel the visitor opened. */
export type ContactMethod = 'email' | 'linkedin' | 'github';

/** Which entry point sent the visitor into the blog. */
export type BlogEntryPoint = 'hero' | 'home_featured' | 'home_view_all';

/** Conversion: the visitor downloaded a CV. */
export const trackCvDownload = (location: ConversionLocation, lang: Language) =>
  sendGTMEvent({ event: 'cv_download', location, lang });

/** Conversion: the visitor opened a contact channel. */
export const trackContactClick = (
  method: ContactMethod,
  location?: ConversionLocation,
) => sendGTMEvent({ event: 'contact_click', method, ...(location && { location }) });

/** Navigation, not a conversion: the visitor entered the blog. */
export const trackBlogClick = (location: BlogEntryPoint, slug?: string) =>
  sendGTMEvent({ event: 'blog_click', location, ...(slug && { slug }) });

/** Engagement, not a conversion: fires once per user turn in the assistant. */
export const trackChatMessage = (turn: number) =>
  sendGTMEvent({ event: 'chat_message', turn });
