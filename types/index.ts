import { z } from 'zod';

export type SiteConfig = {
  name: string;
  description: string;
};

export const quizSchema = z.object({
  topic: z
    .string()
    .min(3, { message: 'Topic must be at least 3 characters long' })
    .max(100, { message: 'Topic must be at most 100 characters long' }),
  type: z.enum(['mcq', 'open_ended']),
  amount: z.number().min(1).max(10),
});

export type mcqQuestionType = {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
};

export type OpenEndedQuestionType = {
  question: string;
  answer: string;
};
