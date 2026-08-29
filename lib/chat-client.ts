import { MAX_TURNS } from '@/constants/chat';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

/**
 * `streamed` — at least one token arrived and was handed to `onText`.
 * `unavailable` — rate limited, over quota, or the stream opened but produced
 * nothing. Callers show the contact fallback rather than an error.
 */
export type ChatStreamOutcome = 'streamed' | 'unavailable';

/**
 * POSTs the conversation and streams the reply back.
 *
 * `onText` receives the full reply so far, not a delta, so callers can render
 * it directly without reassembling. Kept free of React so the read loop can be
 * exercised on its own.
 */
export async function streamChatReply(
  messages: ChatMessage[],
  onText: (textSoFar: string) => void,
  signal?: AbortSignal,
): Promise<ChatStreamOutcome> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: messages.slice(-MAX_TURNS) }),
    signal,
  });

  if (!response.ok || !response.body) return 'unavailable';

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
    onText(text);
  }

  // A stream that opens and closes without tokens is typically a quota error
  // surfacing mid-stream, so it gets the same fallback as an outright failure.
  return text ? 'streamed' : 'unavailable';
}
