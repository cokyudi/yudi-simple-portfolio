'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { trackChatMessage } from '@/constants/analytics';
import { streamChatReply, type ChatMessage } from '@/lib/chat-client';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';

/**
 * Conversation state for the assistant widget: message list, draft input, and
 * the in-flight request. Keeps the transport and the bookkeeping out of the
 * view, which is then purely presentational.
 */
export function useChat() {
  const { language } = useLanguage();
  const t = i18n[language].chat;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const appendAssistant = useCallback(
    (content: string) => setMessages((prev) => [...prev, { role: 'assistant', content }]),
    [],
  );

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
      setMessages(next);
      setInput('');
      setLoading(true);
      trackChatMessage(next.filter((message) => message.role === 'user').length);

      const controller = new AbortController();
      abortRef.current = controller;
      let streaming = false;

      try {
        const outcome = await streamChatReply(
          next,
          (textSoFar) => {
            if (streaming) {
              // Replace the reply in place as more tokens arrive.
              setMessages((prev) => [
                ...prev.slice(0, -1),
                { role: 'assistant', content: textSoFar },
              ]);
            } else {
              streaming = true;
              setLoading(false);
              appendAssistant(textSoFar);
            }
          },
          controller.signal,
        );

        if (outcome === 'unavailable') appendAssistant(t.busy);
      } catch (error) {
        // An abort is the user closing the widget, not a failure to report.
        if ((error as Error).name !== 'AbortError') appendAssistant(t.error);
      } finally {
        abortRef.current = null;
        setLoading(false);
      }
    },
    [appendAssistant, loading, messages, t.busy, t.error],
  );

  /** Drop an in-flight reply — the visitor closed the widget or navigated away. */
  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []);

  return { messages, input, setInput, loading, send, cancel };
}
