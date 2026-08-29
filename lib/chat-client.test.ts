import { afterEach, describe, expect, it, vi } from 'vitest';
import { streamChatReply, type ChatMessage } from '@/lib/chat-client';

const MESSAGES: ChatMessage[] = [{ role: 'user', content: 'hello' }];

/** A Response whose body streams the given chunks as UTF-8. */
function streamingResponse(chunks: string[]): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(body, { status: 200 });
}

function mockFetch(response: Response) {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => vi.unstubAllGlobals());

describe('streamChatReply', () => {
  it('reports the cumulative text so far, not deltas', async () => {
    mockFetch(streamingResponse(['Hello', ' there', '!']));
    const seen: string[] = [];

    const outcome = await streamChatReply(MESSAGES, (text) => seen.push(text));

    expect(outcome).toBe('streamed');
    expect(seen).toEqual(['Hello', 'Hello there', 'Hello there!']);
  });

  it('treats a non-OK response as unavailable rather than throwing', async () => {
    mockFetch(new Response('rate limited', { status: 429 }));
    const onText = vi.fn();

    await expect(streamChatReply(MESSAGES, onText)).resolves.toBe('unavailable');
    expect(onText).not.toHaveBeenCalled();
  });

  it('treats an OK response with an empty stream as unavailable', async () => {
    // A quota error can surface mid-stream: the request succeeds, then closes
    // without producing tokens. That must reach the contact fallback too.
    mockFetch(streamingResponse([]));

    await expect(streamChatReply(MESSAGES, vi.fn())).resolves.toBe('unavailable');
  });

  it('caps how many turns of history it sends', async () => {
    const fetchMock = mockFetch(streamingResponse(['ok']));
    const long: ChatMessage[] = Array.from({ length: 20 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: `m${i}`,
    }));

    await streamChatReply(long, vi.fn());

    const sent = JSON.parse(fetchMock.mock.calls[0][1].body).messages;
    expect(sent).toHaveLength(8);
    expect(sent.at(-1).content).toBe('m19');
  });

  it('propagates an abort so callers can tell it from a failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(Object.assign(new Error('aborted'), { name: 'AbortError' })),
    );

    await expect(streamChatReply(MESSAGES, vi.fn())).rejects.toMatchObject({
      name: 'AbortError',
    });
  });
});
