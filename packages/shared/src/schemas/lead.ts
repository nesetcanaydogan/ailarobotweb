import { z } from 'zod';

export const LeadSchema = z.object({
  email: z.string().email(),
  businessName: z.string().min(2),
});

export type Lead = z.infer<typeof LeadSchema>;
