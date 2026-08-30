import { Fragment, type ReactNode } from 'react';

// Markdown links [label](url) and bare URLs, so neither renders as raw syntax.
// Read with matchAll, which clones the regex rather than advancing lastIndex on
// this shared constant — exec() would make it mutable state across renders.
const LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;

/**
 * Assistant replies are plain text with occasional links — far short of
 * needing a Markdown renderer, but raw `[label](url)` in the bubble looks
 * broken. This linkifies just that much.
 */
export default function AssistantMessage({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
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
