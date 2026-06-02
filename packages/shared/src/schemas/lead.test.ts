import { test } from 'node:test';
import assert from 'node:assert';
// @ts-ignore - we haven't created this file yet
import { LeadSchema } from './lead';

test('LeadSchema validates correct input', () => {
  const validLead = {
    email: 'test@example.com',
    businessName: 'AILA'
  };
  const result = LeadSchema.parse(validLead);
  assert.deepStrictEqual(result, validLead);
});

test('LeadSchema fails for invalid email', () => {
  const invalidLead = {
    email: 'not-an-email',
    businessName: 'AILA'
  };
  assert.throws(() => LeadSchema.parse(invalidLead));
});

test('LeadSchema fails for empty business name', () => {
  const invalidLead = {
    email: 'test@example.com',
    businessName: ''
  };
  assert.throws(() => LeadSchema.parse(invalidLead));
});
