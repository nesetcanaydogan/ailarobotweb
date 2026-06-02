import React, { useActionState } from 'react';
import { GlassyCard } from '../cards/GlassyCard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LeadSchema } from '@aila/shared';

type ActionState = {
  success?: boolean;
  errors?: {
    email?: string[];
    businessName?: string[];
    message?: string;
  };
};

async function submitLead(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formData.get('email') as string;
  const businessName = formData.get('businessName') as string;

  const validated = LeadSchema.safeParse({ email, businessName });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated.data),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        errors: { message: data.error || 'Something went wrong' },
      };
    }

    return { success: true };
  } catch (error) {
    return {
      errors: { message: 'Network error. Please try again.' },
    };
  }
}

export function LeadForm() {
  const [state, action, isPending] = useActionState(submitLead, {});

  if (state.success) {
    return (
      <GlassyCard className="w-full max-w-md mx-auto text-center py-12">
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 bg-celestial-light/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-celestial-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-heading text-ghost-white mb-2">Request Received</h3>
          <p className="text-comet">We'll be in touch soon to schedule your demo.</p>
        </div>
      </GlassyCard>
    );
  }

  return (
    <GlassyCard className="w-full max-w-md mx-auto">
      <form action={action} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-heading text-ghost-white">Request a Demo</h2>
          <p className="text-body text-comet">Experience the future of robotics.</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="businessName" className="text-caption text-arctic-mist">
              Business Name
            </label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="AeroDyne Systems"
              required
            />
            {state.errors?.businessName && (
              <p className="text-caption text-neon-violet">{state.errors.businessName[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-caption text-arctic-mist">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="contact@aerodyne.com"
              required
            />
            {state.errors?.email && (
              <p className="text-caption text-neon-violet">{state.errors.email[0]}</p>
            )}
          </div>
        </div>

        {state.errors?.message && (
          <p className="text-body text-neon-violet text-center">{state.errors.message}</p>
        )}

        <Button variant="solid" type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Request Demo'}
        </Button>
      </form>
    </GlassyCard>
  );
}
