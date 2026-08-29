import { Fragment, type ReactNode } from 'react';

// Markdown links [label](url) and bare URLs, so neither renders as raw syntax.
// Kept as a source string and compiled per call: a shared /g regex carries
// lastIndex between renders, which makes it mutable state shared across
// concurrent renders.
const LINK_PATTERN_SOURCE =
  '\\[([^\\]]+)\\]\\((https?://[^\\s)]+)\\)|(https?://[^\\s)]+)';

/**
 * Assistant replies are plain text with occasional links — far short of
 * needing a Markdown renderer, but raw `[label](url)` in the bubble looks
 * broken. This linkifies just that much.
 */
export default function AssistantMessage({ text }: { text: string }) {
  const pattern = new RegExp(LINK_PATTERN_SOURCE, 'g');
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (
    let match = pattern.exec(text);
    match !== null;
    match = pattern.exec(text)
  ) {
    const [whole, label, markdownUrl, bareUrl] = match;
    const start = match.index;

    if (start > cursor) parts.push(text.slice(cursor, start));

    const url = markdownUrl ?? bareUrl;
    parts.push(
      <a
        key={`${start}-${url}`}
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-accent underline underline-offset-2 break-words'
      >
        {label ?? bareUrl}
      </a>,
    );
    cursor = start + whole.length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
