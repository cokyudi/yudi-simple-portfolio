import { describe, expect, it, vi } from 'vitest';
import { clickPayload, listenForClicks, trackCvDownload } from '@/constants/analytics';

const pushes = vi.hoisted((): Record<string, unknown>[] => []);
vi.mock('@next/third-parties/google', () => ({
  sendGTMEvent: (data: Record<string, unknown>) => pushes.push(data),
}));

/** What GTM's Data Layer Variables read after the pushes so far: a key keeps its last value. */
const dataLayerState = () => Object.assign({}, ...pushes);

const render = (html: string) => {
  document.body.innerHTML = html;
  document.documentElement.lang = 'ja';
};

describe('clickPayload', () => {
  it('reports the enclosing section, the control name and its label', () => {
    render(`<nav data-section="nav"><button data-track="theme_toggle" data-label="dark"><svg></svg></button></nav>`);
    expect(clickPayload(document.querySelector('svg')!)).toEqual({
      event: 'ui_click',
      section: 'nav',
      element: 'theme_toggle',
      label: 'dark',
      lang: 'ja',
    });
  });

  it('falls back to link + href for unnamed links', () => {
    render(`<article data-section="post_body"><a href="https://example.com"><em>x</em></a></article>`);
    expect(clickPayload(document.querySelector('em')!)).toMatchObject({
      section: 'post_body',
      element: 'link',
      link_url: 'https://example.com',
    });
  });

  it('ignores clicks outside links and buttons, and marks unsectioned ones', () => {
    render(`<p>text</p><a href="/x">x</a>`);
    expect(clickPayload(document.querySelector('p')!)).toBeNull();
    expect(clickPayload(document.querySelector('a')!)).toMatchObject({ section: 'other' });
  });
});

describe('data layer pushes', () => {
  it('do not carry parameters over from earlier events', () => {
    render(`<div data-section="chat"><button data-track="chat_toggle" data-label="close">x</button></div>
      <nav data-section="nav"><a href="/blog">blog</a></nav>`);
    // jsdom can't navigate; the capture-phase listener has already run by then.
    document.querySelector('a')!.addEventListener('click', (e) => e.preventDefault());
    const stop = listenForClicks();
    document.querySelector('button')!.click();
    document.querySelector('a')!.click();
    stop();

    expect(dataLayerState()).toMatchObject({ event: 'ui_click', element: 'link', link_url: '/blog' });
    expect(dataLayerState().label).toBeUndefined();

    trackCvDownload('hero', 'en');
    expect(dataLayerState()).toMatchObject({ event: 'cv_download', location: 'hero', lang: 'en' });
    expect(dataLayerState().section).toBeUndefined();
    expect(dataLayerState().link_url).toBeUndefined();
  });
});
