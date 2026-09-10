'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Holds a bottom-anchored `fixed` element above the on-screen keyboard.
 *
 * iOS anchors `fixed` elements to the layout viewport while the keyboard
 * shrinks only the visual viewport, so a panel pinned to the bottom ends up
 * behind the keyboard. Follow the visual viewport instead: sit just above the
 * keyboard and shrink to the space that is left. `interactive-widget=
 * resizes-content` would do this in CSS alone, but Safari doesn't support it.
 *
 * Only run this while the element is mounted; the CSS `bottom` / `height` it
 * ships with stay the fallback for browsers with no visual viewport to follow.
 */
export function useKeyboardInset(
  ref: RefObject<HTMLElement | null>,
  { maxHeight, gap }: { maxHeight: number; gap: number },
) {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const sync = () => {
      const element = ref.current;
      if (!element) return;
      const keyboard = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      // Clear the space below only while the keyboard isn't already filling it.
      const bottom = keyboard > 0 ? 8 : gap;
      element.style.bottom = `${keyboard + bottom}px`;
      element.style.height = `${Math.min(maxHeight, vv.height - bottom - 16)}px`;
    };

    sync();
    // Written straight to the style so the scroll events iOS fires all through
    // the keyboard animation don't re-render the caller on every frame.
    vv.addEventListener('resize', sync);
    vv.addEventListener('scroll', sync);
    return () => {
      vv.removeEventListener('resize', sync);
      vv.removeEventListener('scroll', sync);
    };
  }, [ref, maxHeight, gap]);
}
