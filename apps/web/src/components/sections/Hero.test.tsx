import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';
import React from 'react';

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />);
    expect(screen.getByText((content, element) => {
      const hasText = (node: Element) => node.textContent === 'The First Truly Autonomous Robotic Companion';
      const nodeHasText = hasText(element!);
      const childrenDontHaveText = Array.from(element?.children || []).every(
        child => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    })).toBeDefined();
  });

  it('renders both CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText(/Get Started/i)).toBeDefined();
    expect(screen.getByText(/Watch Demo/i)).toBeDefined();
  });

  it('renders Lucide icons', () => {
    const { container } = render(<Hero />);
    // Check for SVG elements (Lucide icons)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });
});
