import { Router } from 'express';
import { LeadSchema } from '@aila/shared';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.post('/', async (req, res) => {
  const result = LeadSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.errors,
    });
  }

  const { email, businessName } = result.data;

  try {
    const lead = await prisma.lead.create({
      data: {
        email,
        businessName,
      },
    });

    return res.status(201).json(lead);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'A lead with this email already exists',
      });
    }

    console.error('Error creating lead:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

export default router;
