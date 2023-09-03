import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { mcqQuestionType } from '@/types';
import { OpenEndedQuestionType } from '@/types';
import { quizSchema } from '@/types';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(req: Request, res: Response) {
  try {
    const session = await auth();

    const body = await req.json();

    const { amount, topic, type } = quizSchema.parse(body);

    const game = await prisma.game.create({
      data: {
        gameType: type,
        topic,
        timeStarted: new Date(),
        userId: session?.user.id as string,
      },
    });

    const { data } = await axios.post(`${process.env.API_URL}/api/questions`, {
      amount,
      topic,
      type,
    });

    if (type === 'mcq') {
      let manyData = data.questions.map((question: mcqQuestionType) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: 'mcq',
        };
      });

      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === 'open_ended') {
      let manyData = data.questions.map((question: OpenEndedQuestionType) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: 'open_ended',
        };
      });

      await prisma.question.createMany({
        data: manyData,
      });
    }

    return NextResponse.json({
      gameId: game.id,
    });
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
