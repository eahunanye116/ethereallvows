'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized thank you notes.
 *
 * - generateThankYouNote - A function that generates a thank you note based on the provided input.
 * - GenerateThankYouNoteInput - The input type for the generateThankYouNote function.
 * - GenerateThankYouNoteOutput - The output type for the generateThankYouNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateThankYouNoteInputSchema = z.object({
  guestName: z.string().describe('The name of the guest writing the thank you note.'),
  relationshipToCouple: z.string().describe('The relationship of the guest to the couple (e.g., friend, family member, colleague).'),
  giftDescription: z.string().describe('A description of the gift given by the guest.'),
});
export type GenerateThankYouNoteInput = z.infer<typeof GenerateThankYouNoteInputSchema>;

const GenerateThankYouNoteOutputSchema = z.object({
  thankYouNote: z.string().describe('The generated thank you note text.'),
});
export type GenerateThankYouNoteOutput = z.infer<typeof GenerateThankYouNoteOutputSchema>;

export async function generateThankYouNote(input: GenerateThankYouNoteInput): Promise<GenerateThankYouNoteOutput> {
  return generateThankYouNoteFlow(input);
}

const thankYouNotePrompt = ai.definePrompt({
  name: 'thankYouNotePrompt',
  input: {schema: GenerateThankYouNoteInputSchema},
  output: {schema: GenerateThankYouNoteOutputSchema},
  prompt: `You are an expert in writing thank you notes. A guest named {{guestName}}, who is a {{relationshipToCouple}}, gave a gift described as {{giftDescription}}. Write a personalized thank you note to the couple, Rose and Kim Young Wookk, expressing gratitude for their wedding and their gift.`,
});

const generateThankYouNoteFlow = ai.defineFlow(
  {
    name: 'generateThankYouNoteFlow',
    inputSchema: GenerateThankYouNoteInputSchema,
    outputSchema: GenerateThankYouNoteOutputSchema,
  },
  async input => {
    const {output} = await thankYouNotePrompt(input);
    return output!;
  }
);
