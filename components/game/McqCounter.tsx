import { LuCheckCircle2, LuXCircle } from 'react-icons/lu';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';

type McqCounterType = {
  correctAnswers: number;
  wrongAnswers: number;
};

export default function McqCounter({
  correctAnswers,
  wrongAnswers,
}: McqCounterType) {
  return (
    <Card className='flex flex-row items-center w-fit px-3 py-1'>
      <LuCheckCircle2 color='green' size={24} />
      <span className='mx-2 text-lg font-semibold text-[green]'>
        {correctAnswers}
      </span>
      <Separator orientation='vertical' />
      <span className='mx-2 text-lg font-semibold text-red-600'>
        {wrongAnswers}
      </span>
      <LuXCircle color='red' size={24} />
    </Card>
  );
}
