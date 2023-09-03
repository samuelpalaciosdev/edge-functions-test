import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function strictJsonOutput(
  systemPrompt: string,
  userPrompt: string
) {
  const model = 'gpt-3.5-turbo';

  const response = await openai.chat.completions.create({
    temperature: 1,
    model: model,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
      {
        role: 'system',
        content: systemPrompt,
      },
    ],
  });

  const res = response.choices[0].message.content;
  try {
    const output = JSON.parse(res as string);
    return output;
  } catch (error) {
    console.log('An exception occurred: ', error);
  }
}
