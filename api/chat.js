import { chatCore } from '../server-chat-core.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const result = await chatCore({
    message: req.body?.message,
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
  });

  return res.status(result.status).json(result.body);
}
