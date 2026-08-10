export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const { chatCore } = await import("../server-chat-core.mjs");

    const result = await chatCore({
      message: req.body?.message,
      apiKey: process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
    });

    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Chat API error:", error);

    return res.status(500).json({
      error: "Unable to load the AI service.",
    });
  }
}