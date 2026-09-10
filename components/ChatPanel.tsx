'use client';

import { useEffect, useRef } from 'react';
import AssistantMessage from '@/components/AssistantMessage';
import { MAX_INPUT_CHARS } from '@/constants/chat';
import { useKeyboardInset } from '@/hooks/useKeyboardInset';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';
import type { ChatMessage } from '@/lib/chat-client';

interface ChatPanelProps {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  send: (text: string) => void;
  onClose: () => void;
}

/**
 * The assistant conversation itself. Mounted only while the widget is open, so
 * "on open" behaviour — focus, keyboard inset, Escape — is just mount
 * behaviour, and the panel owns the refs it needs rather than borrowing them.
 */
export default function ChatPanel({
  messages,
  input,
  setInput,
  loading,
  send,
  onClose,
}: ChatPanelProps) {
  const { language } = useLanguage();
  const t = i18n[language].chat;

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Matches the `h-[28rem]` / `bottom-32` fallback below.
  useKeyboardInset(panelRef, { maxHeight: 448, gap: 128 });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    // Deliberately not aria-modal: the rest of the page stays interactive and
    // focus is not trapped, so claiming modality would mislead screen readers
    // into hiding content that is still reachable.
    <div
      ref={panelRef}
      role='dialog'
      aria-label={t.title}
      className='fixed bottom-32 right-4 z-40 flex h-[28rem] w-[min(22rem,calc(100vw-2rem))] flex-col border-2 border-ink bg-paper shadow-retro'
    >
      <div className='flex items-center justify-between border-b-2 border-ink bg-surface px-4 py-3'>
        <span className='font-display font-bold text-fg'>{t.title}</span>
        <button
          onClick={onClose}
          aria-label={t.close}
          className='font-display font-bold text-fg hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
        >
          ✕
        </button>
      </div>

      <div
        ref={scrollRef}
        aria-live='polite'
        className='flex-1 space-y-3 overflow-y-auto p-4 text-sm'
      >
        <p className='text-muted'>{t.greeting}</p>

        {messages.length === 0 && (
          <div className='flex flex-wrap gap-2'>
            {t.suggestions.map((question) => (
              <button
                key={question}
                onClick={() => send(question)}
                className='border-2 border-ink bg-surface px-2.5 py-1 text-xs text-fg shadow-retro-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-accent active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {messages.map((message, i) => (
          <div
            key={i}
            className={message.role === 'user' ? 'text-right' : 'text-left'}
          >
            <span
              className={`inline-block max-w-[85%] whitespace-pre-wrap border-2 border-ink px-3 py-2 text-left shadow-retro-sm ${
                message.role === 'user'
                  ? 'bg-accent text-on-accent'
                  : 'bg-surface text-fg'
              }`}
            >
              {message.role === 'assistant' ? (
                <AssistantMessage text={message.content} />
              ) : (
                message.content
              )}
            </span>
          </div>
        ))}
        {loading && <p className='text-left text-muted'>…</p>}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
        className='flex gap-2 border-t-2 border-ink p-3'
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          maxLength={MAX_INPUT_CHARS}
          // 16px on mobile: iOS zooms the page for any smaller focused input.
          className='min-w-0 flex-1 border-2 border-ink bg-surface px-3 py-2 text-base text-fg sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
        />
        <button
          type='submit'
          disabled={loading || !input.trim()}
          className='border-2 border-ink bg-accent px-3 py-2 text-sm font-display font-bold text-on-accent shadow-retro-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50'
        >
          {t.send}
        </button>
      </form>
    </div>
  );
}
