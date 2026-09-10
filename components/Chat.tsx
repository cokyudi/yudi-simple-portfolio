'use client';

import { useEffect, useRef, useState } from 'react';
import AssistantMessage from '@/components/AssistantMessage';
import { MAX_INPUT_CHARS } from '@/constants/chat';
import { useChat } from '@/hooks/useChat';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';

export default function Chat() {
  const { language } = useLanguage();
  const t = i18n[language].chat;

  const [open, setOpen] = useState(false);
  const { messages, input, setInput, loading, send, cancel } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = () => {
    cancel();
    setOpen(false);
    // Send focus back to the control that opened the panel, so keyboard users
    // aren't dropped at the top of the document.
    toggleRef.current?.focus();
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // iOS anchors `fixed` elements to the layout viewport, so the on-screen
  // keyboard covers the bottom of the panel instead of pushing it up. Follow
  // the visual viewport instead: sit just above the keyboard and shrink to the
  // space that is left. Values mirror the `bottom-32` / `h-[28rem]` fallback.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!open || !vv) return;
    const sync = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const keyboard = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      const gap = keyboard > 0 ? 8 : 128; // only clear the toggle while it is visible
      panel.style.bottom = `${keyboard + gap}px`;
      panel.style.height = `${Math.min(448, vv.height - gap - 16)}px`;
    };
    sync();
    vv.addEventListener('resize', sync);
    vv.addEventListener('scroll', sync);
    return () => {
      vv.removeEventListener('resize', sync);
      vv.removeEventListener('scroll', sync);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      {open && (
        // Deliberately not aria-modal: the rest of the page stays interactive
        // and focus is not trapped, so claiming modality would mislead screen
        // readers into hiding content that is still reachable.
        <div
          ref={panelRef}
          role='dialog'
          aria-label={t.title}
          className='fixed bottom-32 right-4 z-40 flex h-[28rem] w-[min(22rem,calc(100vw-2rem))] flex-col border-2 border-ink bg-paper shadow-retro'
        >
          <div className='flex items-center justify-between border-b-2 border-ink bg-surface px-4 py-3'>
            <span className='font-display font-bold text-fg'>{t.title}</span>
            <button
              onClick={close}
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
      )}

      <button
        ref={toggleRef}
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        className='fixed bottom-4 right-4 z-40 flex flex-col items-center transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
      >
        {/* The label lives in the bubble, so the face reads as the thing
            speaking rather than an ornament sitting beside a button. The face
            stays put when the panel opens - only the wording changes - so the
            toggle never turns into a different-looking control, and toggleRef
            stays mounted for focus return on close. */}
        <span className='relative border-2 border-ink bg-accent px-3 py-1.5 font-display text-sm font-bold text-on-accent shadow-retro-sm'>
          {open ? t.close : t.open}
          <span
            aria-hidden
            className='absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-ink bg-accent'
          />
        </span>
        <span
          aria-hidden
          className='chat-avatar mt-1 h-16 w-16 border-2 border-ink shadow-retro-sm'
        />
      </button>
    </>
  );
}
