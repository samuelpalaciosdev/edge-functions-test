import { z } from 'zod';

export const quizSchema = z.object({
  topic: z
    .string()
    .min(3, { message: 'Topic must be at least 3 characters long' })
    .max(100, { message: 'Topic must be at most 100 characters long' }),
  type: z.enum(['mcq', 'open_ended']),
  amount: z.number().min(1).max(10),
});
