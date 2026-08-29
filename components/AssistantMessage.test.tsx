import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AssistantMessage from '@/components/AssistantMessage';

describe('AssistantMessage', () => {
  it('renders a markdown link with its label, not the raw syntax', () => {
    render(<AssistantMessage text='See [my CV](https://example.com/cv.pdf) for details.' />);

    const link = screen.getByRole('link', { name: 'my CV' });
    expect(link).toHaveAttribute('href', 'https://example.com/cv.pdf');
    expect(screen.queryByText(/\]\(http/)).toBeNull();
  });

  it('linkifies a bare URL using the URL as its label', () => {
    render(<AssistantMessage text='Visit https://github.com/cokyudi now' />);

    expect(screen.getByRole('link', { name: 'https://github.com/cokyudi' })).toHaveAttribute(
      'href',
      'https://github.com/cokyudi',
    );
  });

  it('handles several links in one reply', () => {
    render(<AssistantMessage text='[a](https://a.com) and [b](https://b.com)' />);

    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('opens links safely in a new tab', () => {
    render(<AssistantMessage text='https://example.com' />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('leaves plain text untouched', () => {
    render(<AssistantMessage text='No links at all here.' />);

    expect(screen.getByText('No links at all here.')).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders links on every render, not just the first', () => {
    // Note: this does not by itself prove the regex is not shared. A drained
    // exec loop resets lastIndex when it returns null, so sequential renders
    // are safe either way — the per-call regex guards against interleaved
    // concurrent renders, which cannot be reproduced synchronously here.
    const { unmount } = render(<AssistantMessage text='first https://one.com' />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://one.com');
    unmount();

    render(<AssistantMessage text='second https://two.com' />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://two.com');
  });
});
