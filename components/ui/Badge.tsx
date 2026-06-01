import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'accent' | 'neutral';

export default function Badge({
  variant = 'neutral',
  className = '',
  children,
  ...rest
}: ComponentPropsWithoutRef<'span'> & { variant?: Variant }) {
  return (
    <span
      className={`inline-flex items-center border-2 border-ink px-2 py-0.5 text-xs font-display font-bold shadow-retro-sm ${
        variant === 'accent' ? 'bg-accent text-on-accent' : 'bg-surface text-fg'
      } ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
