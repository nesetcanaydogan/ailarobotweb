import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassyCard } from './GlassyCard';

describe('GlassyCard', () => {
  it('renders children correctly', () => {
    render(<GlassyCard>Card Content</GlassyCard>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies glassy styles', () => {
    const { container } = render(<GlassyCard>Content</GlassyCard>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-[rgba(186,214,247,0.03)]');
    expect(card).toHaveClass('backdrop-blur-xl');
    expect(card).toHaveClass('shadow-glass');
  });
});
