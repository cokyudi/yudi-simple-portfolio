'use client';

import { useCallback, useRef, useState } from 'react';
import ChatPanel from '@/components/ChatPanel';
import { useChat } from '@/hooks/useChat';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/constants/i18n';

export default function Chat() {
  const { language } = useLanguage();
  const t = i18n[language].chat;

  const [open, setOpen] = useState(false);
  // Conversation state lives here, not in the panel: it has to survive the
  // panel unmounting so closing the widget doesn't wipe the conversation.
  const { messages, input, setInput, loading, send, cancel } = useChat();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    cancel();
    setOpen(false);
    // Send focus back to the control that opened the panel, so keyboard users
    // aren't dropped at the top of the document.
    toggleRef.current?.focus();
  }, [cancel]);

  return (
    <>
      {open && (
        <ChatPanel
          messages={messages}
          input={input}
          setInput={setInput}
          loading={loading}
          send={send}
          onClose={close}
        />
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
