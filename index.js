import 'dotenv/config'

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Reply yes in markdown with head 2',
});

console.log(text);
