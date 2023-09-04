import strictJsonOutput from '@/lib/gpt';
import { quizSchema } from '@/lib/validation/game';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const runtime = 'edge';

const mcqJsonFormat = `
{
  question: 'question',
  answer: 'answer with max length of 20 words',
  option1: 'option1 with max length of 20 words',
  option2: 'option2 with max length of 20 words',
  option3: 'option3 with max length of 20 words',
}
`;

const openEndedJsonFormat = `
{
  question: 'question',
  answer: 'answer with max length of 20 words',
}
`;

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { amount, topic, type } = quizSchema.parse(body);
    let questions: any;
    if (type === 'open_ended') {
      questions = await strictJsonOutput(
        `You are a helpful and friendly AI that is able to generate a pair of question and answers, the length of each answer should not be more than 20 words. Store all the pairs of answers and questions in a RFC8259 compliant JSON array following this format without deviation (important the question or answer should not contain any kind of backslashes or slashes that affect the reading of it). ${openEndedJsonFormat}`,
        `You are going to generate ${amount} random medium difficulty open-ended questions about ${topic}`
      );
    } else if (type === 'mcq') {
      questions = await strictJsonOutput(
        `You are a helpful and friendly AI that is able to generate mcq questions and answers, the length of each answer should not be more than 20 words. Store all the pairs of answers and questions in a RFC8259 compliant JSON array following this format without deviation (important the question or answer should not contain any kind of backslashes or slashes that affect the reading of it). ${mcqJsonFormat}`,
        `You are going to generate ${amount} random medium difficulty mcq question about ${topic}`
      );
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error('gpt error', error);
      return NextResponse.json(
        { error: 'An unexpected error occurred.' },
        {
          status: 500,
        }
      );
    }
  }
}
