'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useForm } from 'react-hook-form';
import { quizSchema } from '@/lib/validation/game';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { LuBookOpen, LuCopyCheck } from 'react-icons/lu';
import { Separator } from './ui/separator';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type Input = z.infer<typeof quizSchema>;

export default function QuizCreationForm() {
  const router = useRouter();

  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const res = await axios.post('/api/game', {
        amount,
        topic,
        type,
      });
      return res.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      amount: 3,
      topic: '',
      type: 'mcq',
    },
  });

  const onSubmit = (values: Input) => {
    getQuestions(
      {
        amount: values.amount,
        topic: values.topic,
        type: values.type,
      },
      {
        onSuccess: ({ gameId }) => {
          if (form.getValues('type') === 'open_ended') {
            router.push(`/play/open-ended/${gameId}`);
          } else {
            router.push(`/play/mcq/${gameId}`);
          }
        },
      }
    );
  };

  form.watch();
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold'>
            Quiz creation
          </CardTitle>
          <CardDescription className=''>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          {/*Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Topic field */}
              <FormField
                control={form.control}
                name='topic'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter a topic...'
                        {...field}
                        onChange={(e) => {
                          form.setValue('topic', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>Please provide a topic</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*Amount field */}
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter an amount...'
                        type='number'
                        min={1}
                        max={10}
                        {...field}
                        onChange={(e) => {
                          form.setValue('amount', parseInt(e.target.value));
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Type of quiz buttons */}
              <div className='flex justify-between space-x-2'>
                <Button
                  type='button'
                  onClick={() => {
                    form.setValue('type', 'mcq');
                  }}
                  variant={
                    form.getValues('type') === 'mcq' ? 'default' : 'secondary'
                  }
                >
                  <LuCopyCheck className='w-4 h-4 mr-2' />
                  Multiple choice
                </Button>
                <Separator orientation='vertical' />
                <Button
                  type='button'
                  onClick={() => {
                    form.setValue('type', 'open_ended');
                  }}
                  variant={
                    form.getValues('type') === 'open_ended'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  <LuBookOpen className='w-4 h-4 mr-2' />
                  Open ended
                </Button>
              </div>
              <Button disabled={isLoading} type='submit'>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
