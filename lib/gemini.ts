'use server';

import { GoogleGenAI, Type } from '@google/genai';

export const generatePhraseDetails = async (thai: string, japanese?: string, english?: string) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Gemini API key is missing. Set GEMINI_API_KEY (preferred) or NEXT_PUBLIC_GEMINI_API_KEY.'
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Analyze the following Thai phrase: "${thai}".
    ${japanese ? `The Japanese meaning is approximately: "${japanese}".` : 'Provide a Japanese translation.'}
    ${english ? `The English meaning is approximately: "${english}".` : 'Provide an English translation.'}
    
    Provide the Romanization (phonetic spelling with tone markers if possible, e.g., RTGS or similar common phonetic transcription).
    Also provide the Japanese and English translations if they were not provided, or refine them if they were.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          romanization: { type: Type.STRING, description: 'Romanization of the Thai phrase' },
          japanese: { type: Type.STRING, description: 'Japanese translation' },
          english: { type: Type.STRING, description: 'English translation' },
        },
        required: ['romanization', 'japanese', 'english'],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error('No response from Gemini');
  
  return JSON.parse(text) as { romanization: string; japanese: string; english: string };
};
