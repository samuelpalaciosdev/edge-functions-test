'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LuHistory } from 'react-icons/lu';

export default function HistoryCard() {
  const router = useRouter();
  return (
    <Card
      className='hover:cursor-pointer hover:opacity-75'
      onClick={() => {
        router.push('/history');
      }}
    >
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-2xl font-semibold'>History</CardTitle>
        <LuHistory size={28} />
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground'>
          View your past quiz results!
        </p>
      </CardContent>
    </Card>
  );
}
