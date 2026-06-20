'use client';

import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';

type Message = { role: 'user' | 'assistant'; content: string };

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

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply = res.ok && data.text ? data.text : data.error || t.error;
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: t.error }]);
    } finally {
      setLoading(false);
    }
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
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <span
                  className={`inline-block max-w-[85%] whitespace-pre-wrap border-2 border-ink px-3 py-2 text-left shadow-retro-sm ${
                    m.role === 'user' ? 'bg-accent text-on-accent' : 'bg-surface text-fg'
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
            {loading && <p className='text-left text-muted'>…</p>}
          </div>

          <form onSubmit={send} className='flex gap-2 border-t-2 border-ink p-3'>
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
