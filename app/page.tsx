import Image from 'next/image';

export default function Home() {
  return (
    <main className=''>
      {/* Hero section */}
      <section className='space-y-6 pt-16 lg:py-32'>
        <div className='container flex flex-col max-w[64rem] items-center gap-4 text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-7xl font-semibold'>
            Edge functions AI
          </h1>
          <p className='text-muted-foreground leading-6 md:text-lg md:leading-normal max-w[42rem]'>
            Project to learn about edge functions and AI, built using Next.js,
            Tailwind and OpenAI API.
          </p>
        </div>
      </section>
    </main>
  );
}
