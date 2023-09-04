'use client';
import { useMemo, useState } from 'react';
import type { Game, Question } from '@prisma/client';
import { LuChevronRight, LuTimer } from 'react-icons/lu';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import McqCounter from './McqCounter';

type McqProps = {
  game: Game & {
    questions: Pick<Question, 'id' | 'options' | 'question'>[];
  };
};

export default function Mcq({ game }: McqProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number>(0);

  // This hook will only recompute the value when the questionIndex or game.questions changes

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = useMemo(() => {
    if (!currentQuestion || !currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[80vw] max-w-4xl'>
      {/* Topic and timer */}
      <div className='flex flex-row justify-between items-center mb-2'>
        <div className='flex flex-col'>
          <div className='space-x-4 mb-4'>
            <span className='text-slate-500 dark:text-slate-200'>Topic</span>
            <span className='px-2 py-1 rounded-lg text-white bg-slate-800'>
              {game.topic}
            </span>
          </div>
          <div className='flex self-start text-slate-500 items-center'>
            <LuTimer className='w-6 h-6 mr-2' />
            <span>00:00</span>
          </div>
        </div>

        {/* Question counter */}
        <McqCounter correctAnswers={5} wrongAnswers={2} />
      </div>

      <Card className='w-full mt-4'>
        <CardHeader className='flex flex-row items-center space-y-0'>
          <CardTitle className='mr-5 divide-y-2 divide-zinc-600/50 dark:divide-slate-300'>
            <div className='question-index'>{questionIndex + 1}</div>
            <div className='text-base text-slate-500'>
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className='flex-grow text-lg'>
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>

      {/*Answer options */}
      <div className='flex flex-col items-center justify-center w-full mt-4 space-y-4'>
        {options.map((option, index) => (
          <Button
            key={index}
            className='w-full justify-start py-8'
            onClick={() => setSelectedOption(index)}
            variant={selectedOption === index ? 'default' : 'secondary'}
          >
            <div className='flex items-center justify-start'>
              <div className='p-2 px-3 mr-5 border rounded-md'>{index + 1}</div>
              <p>{option}</p>
            </div>
          </Button>
        ))}
        <Button>
          Next <LuChevronRight className='w-4-h4 ml-2' />
        </Button>
      </div>
    </div>
  );
}
