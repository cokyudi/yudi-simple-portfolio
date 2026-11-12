import { describe, expect, it } from 'vitest';
import { clickPayload } from '@/constants/analytics';

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
