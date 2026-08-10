export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured on the server.",
      });
    }

    const portfolioContext = `
You are Rahul Debnath's AI portfolio assistant.

Answer questions about Rahul based ONLY on the following portfolio information.

Rahul Debnath is a Full-Stack Developer and technology enthusiast.

He has experience/interests in:
- Full-Stack Development
- Web Development
- Machine Learning
- Computer Vision
- Artificial Intelligence
- Problem Solving
- Python
- JavaScript
- React
- Backend Development

He has worked on projects involving AI, machine learning, web development, and research.

He also worked on research involving Quantum-Inspired Ant Colony Optimization for the Travelling Salesman Problem (TSP).

If a visitor asks something that is not present in this context, say that the information is not available in Rahul's portfolio and suggest contacting Rahul.

Be concise, professional, and helpful.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          model,
          input: `${portfolioContext}\n\nVisitor question:\n${message}`,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "Gemini API request failed.",
      });
    }

    return res.status(200).json({
      answer:
        data?.output_text ||
        data?.output?.[0]?.content?.[0]?.text ||
        "I couldn't generate a response.",
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Unable to connect to the AI service.",
    });
  }
}