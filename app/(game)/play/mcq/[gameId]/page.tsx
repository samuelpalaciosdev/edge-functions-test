import Mcq from '@/components/game/Mcq';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

type McqGamePageProps = {
  params: {
    gameId: string;
  };
};

export default async function McqGamePage({
  params: { gameId },
}: McqGamePageProps) {
  const session = await auth();

  if (!session?.user) {
    return redirect('/');
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });

  if (!game || game.gameType !== 'mcq') {
    return redirect('/quiz');
  }

  return (
    <>
      <div className='container flex flex-col max-w-[64rem] mx-auto gap-4 text-center'>
        <Mcq game={game} />
      </div>
    </>
  );
}
