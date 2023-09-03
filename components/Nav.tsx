import Link from 'next/link';
import { Button } from './ui/button';

export default function Nav() {
  return (
    <nav className='fixed top-0 inset-x-0 h-fit py-4 bg-white dark:bg-gray-950 z-[10] border-b border-zinc-300'>
      <div className='container max-w-7xl flex items-center justify-between gap-2'>
        <Link
          href={'/'}
          className='rounded-md border-2 border-b-4 border-r-2 border-black px-2 py-1 text-lg font-semibold transition-all hover:-translate-y-[2px] md:block dark:border-white'
        >
          AI app
        </Link>
        <Button>Sign in</Button>
      </div>
    </nav>
  );
}
