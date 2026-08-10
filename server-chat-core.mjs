import { PORTFOLIO_CONTEXT } from './src/data/portfolioContext.js';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/interactions';

function extractText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const parts = [];
  for (const step of data?.steps || []) {
    if (step?.type !== 'model_output') continue;
    for (const content of step?.content || []) {
      if (content?.type === 'text' && typeof content?.text === 'string') {
        parts.push(content.text);
      }
    }
  }
  return parts.join('\n').trim();
}

export async function chatCore({ message, apiKey, model = 'gemini-3.6-flash' }) {
  if (!apiKey) {
    return {
      status: 500,
      body: { error: 'GEMINI_API_KEY is not configured on the server.' },
    };
  }

  if (typeof message !== 'string' || !message.trim()) {
    return { status: 400, body: { error: 'Message is required.' } };
  }

  const cleanMessage = message.trim();

  if (cleanMessage.length > 1000) {
    return { status: 400, body: { error: 'Message is too long.' } };
  }

  try {
    const geminiResponse = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        model,
        system_instruction: PORTFOLIO_CONTEXT,
        input: cleanMessage,
        generation_config: {
          thinking_level: 'low',
          max_output_tokens: 500,
        },
      }),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error('Gemini API error:', data);
      return {
        status: 502,
        body: {
          error: 'The AI service returned an error.',
          details: process.env.NODE_ENV === 'development'
            ? data?.error?.message || data?.message || 'Gemini request failed.'
            : undefined,
        },
      };
    }

    const reply = extractText(data);

    if (!reply) {
      return { status: 502, body: { error: 'The AI service returned an empty response.' } };
    }

    return { status: 200, body: { reply } };
  } catch (error) {
    console.error('Chat API error:', error);
    return { status: 500, body: { error: 'Unable to reach the AI service.' } };
  }
}
