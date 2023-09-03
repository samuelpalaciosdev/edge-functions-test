import { cn } from '@/lib/utils';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config/site';
import Nav from '@/components/Nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  authors: [
    {
      name: 'Samuel Palacios',
      url: 'https://github.com/samuelpalaciosdev',
    },
  ],
  creator: 'Samuel Palacios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        <div className='container max-w-7xl pt-12'>
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
