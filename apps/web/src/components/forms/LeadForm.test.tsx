import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LeadForm } from './LeadForm';
import React from 'react';

// Mock fetch
global.fetch = vi.fn();

describe('LeadForm', () => {
  it('renders the form fields', () => {
    render(<LeadForm />);
    expect(screen.getByLabelText(/Business Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Email Address/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Request Demo/i })).toBeDefined();
  });

  it('shows success message on successful submission', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<LeadForm />);
    
    fireEvent.change(screen.getByLabelText(/Business Name/i), { target: { value: 'Test Corp' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    
    const submitBtn = screen.getByRole('button', { name: /Request Demo/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Request Received/i)).toBeDefined();
    });
  });

  it('shows validation errors for invalid input', async () => {
    render(<LeadForm />);
    
    const businessInput = screen.getByLabelText(/Business Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const form = businessInput.closest('form')!;

    fireEvent.change(businessInput, { target: { value: 'A' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
      expect(screen.getByText(/String must contain at least 2 character\(s\)/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
