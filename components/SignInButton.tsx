'use client';

import { Button } from './ui/button';
import { signIn, signOut } from 'next-auth/react';

type SignInButtonProps = {
  text: string;
};

export default function SignInButton({ text }: SignInButtonProps) {
  return (
    <Button
      onClick={() => {
        signIn('google').catch(console.error);
      }}
    >
      {text}
    </Button>
  );
}
