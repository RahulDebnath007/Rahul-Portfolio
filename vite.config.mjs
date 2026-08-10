import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { chatCore } from "./server-chat-core.mjs";

function portfolioApiPlugin() {
  return {
    name: "portfolio-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed." }));
          return;
        }

        try {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", async () => {
            try {
              const parsed = body ? JSON.parse(body) : {};

              const result = await chatCore({
                message: parsed.message,
                apiKey: process.env.GEMINI_API_KEY,
                model:
                  process.env.GEMINI_MODEL || "gemini-3.6-flash",
              });

              res.statusCode = result.status;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(result.body));
            } catch (error) {
              console.error("API error:", error);

              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "Internal server error.",
                })
              );
            }
          });
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), portfolioApiPlugin()],
  base: "./",
});