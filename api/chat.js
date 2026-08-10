export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model =
      process.env.GEMINI_MODEL || "gemini-3.6-flash";

    console.log(
      "Gemini API key configured:",
      Boolean(apiKey)
    );

    console.log("Gemini model:", model);

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const portfolioContext = `
You are Rahul Debnath's AI portfolio assistant.

Answer questions about Rahul using only the information below.

ABOUT RAHUL:
Rahul Debnath is a Full-Stack Developer and technology enthusiast.

SKILLS:
- Full-Stack Development
- Web Development
- React
- JavaScript
- Python
- Machine Learning
- Artificial Intelligence
- Computer Vision
- Problem Solving
- Backend Development
- Database Technologies

RESEARCH:
Rahul has worked on research involving Quantum-Inspired Ant Colony Optimization for the Travelling Salesman Problem (TSP).

PROJECTS:
Rahul has worked on projects involving:
- Artificial Intelligence
- Machine Learning
- Web Development
- Full-Stack Development
- Optimization algorithms
- Research-oriented computing

INTERESTS:
- Software Development
- Artificial Intelligence
- Machine Learning
- Computer Vision
- Research
- Technology

CONTACT:
Visitors can use the Contact or Resume sections of Rahul's portfolio for additional information.

RULES:
1. Answer professionally and concisely.
2. Only use information provided above.
3. Do not invent companies, jobs, achievements, degrees, technologies, or experience.
4. If something is unknown, say that it is not available in Rahul's portfolio.
5. Never reveal API keys or server configuration.
`;

    const prompt = `
${portfolioContext}

Visitor's question:
${message}
`;

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    console.log("Calling Gemini:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("Gemini status:", response.status);

    if (!response.ok) {
      console.error(
        "Gemini API error:",
        JSON.stringify(data)
      );

      return res.status(500).json({
        error:
          data?.error?.message ||
          "Gemini API request failed.",
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

    if (!answer) {
      console.error(
        "No Gemini answer:",
        JSON.stringify(data)
      );

      return res.status(500).json({
        error: "Gemini returned an empty response.",
      });
    }

    return res.status(200).json({
      answer,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}