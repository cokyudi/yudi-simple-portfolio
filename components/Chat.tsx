'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';

type Message = { role: 'user' | 'assistant'; content: string };

// Render assistant text with clickable links — handles both Markdown links
// [label](url) and bare URLs, so neither shows as raw syntax.
function renderContent(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const url = m[2] ?? m[3];
    const label = m[1] ?? m[3];
    out.push(
      <a
        key={key++}
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-accent underline underline-offset-2 break-words'
      >
        {label}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Chat() {
  const { language } = useLanguage();
  const t = i18n[language].chat;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, open]);

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);
    sendGTMEvent({
      event: 'chat_message',
      turn: next.filter((msg) => msg.role === 'user').length,
    });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setMessages((m) => [...m, { role: 'assistant', content: data.error || t.error }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      let started = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        if (!started) {
          started = true;
          setLoading(false);
          setMessages((m) => [...m, { role: 'assistant', content: acc }]);
        } else {
          setMessages((m) => {
            const copy = m.slice();
            copy[copy.length - 1] = { role: 'assistant', content: acc };
            return copy;
          });
        }
      }
      if (!started) {
        setMessages((m) => [...m, { role: 'assistant', content: t.error }]);
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: t.error }]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  return (
    <>
      {open && (
        <div
          role='dialog'
          aria-label={t.title}
          className='fixed bottom-24 right-4 z-40 flex h-[28rem] w-[min(22rem,calc(100vw-2rem))] flex-col border-2 border-ink bg-paper shadow-retro'
        >
          <div className='flex items-center justify-between border-b-2 border-ink bg-surface px-4 py-3'>
            <span className='font-display font-bold text-fg'>{t.title}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className='font-display font-bold text-fg hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className='flex-1 space-y-3 overflow-y-auto p-4 text-sm'>
            <p className='text-muted'>{t.greeting}</p>

            {messages.length === 0 && (
              <div className='flex flex-wrap gap-2'>
                {t.suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => submit(q)}
                    className='border-2 border-ink bg-surface px-2.5 py-1 text-xs text-fg shadow-retro-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-accent active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <span
                  className={`inline-block max-w-[85%] whitespace-pre-wrap border-2 border-ink px-3 py-2 text-left shadow-retro-sm ${
                    m.role === 'user' ? 'bg-accent text-on-accent' : 'bg-surface text-fg'
                  }`}
                >
                  {m.role === 'assistant' ? renderContent(m.content) : m.content}
                </span>
              </div>
            ))}
            {loading && <p className='text-left text-muted'>…</p>}
          </div>

          <form onSubmit={onSubmit} className='flex gap-2 border-t-2 border-ink p-3'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              maxLength={1500}
              className='min-w-0 flex-1 border-2 border-ink bg-surface px-3 py-2 text-sm text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
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
        onClick={() => setOpen((o) => !o)}
        aria-label={t.open}
        aria-expanded={open}
        className='fixed bottom-4 right-4 z-40 border-2 border-ink bg-accent px-4 py-3 font-display font-bold text-on-accent shadow-retro transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
      >
        {open ? t.close : t.open}
      </button>
    </>
  );
}
