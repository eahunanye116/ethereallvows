"use server";

import {
  generateThankYouNote,
  type GenerateThankYouNoteInput,
} from "@/ai/flows/generate-thank-you-note";

export async function generateNoteAction(input: GenerateThankYouNoteInput) {
  try {
    const output = await generateThankYouNote(input);
    return { success: true, note: output.thankYouNote };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate thank you note." };
  }
}
