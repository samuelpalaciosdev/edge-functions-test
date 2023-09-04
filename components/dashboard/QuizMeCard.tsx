'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BiBrain } from 'react-icons/bi';

export default function QuizMeCard() {
  const router = useRouter();
  return (
    <Card
      className='hover:cursor-pointer hover:opacity-75'
      onClick={() => {
        router.push('/quiz');
      }}
    >
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-2xl font-semibold'>Quiz me!</CardTitle>
        <BiBrain size={28} />
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground'>
          Challenge yourself with a quiz!
        </p>
      </CardContent>
    </Card>
  );
}
