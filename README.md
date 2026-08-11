# 🤖 AI Chatbot Integration in My Portfolio

An AI-powered portfolio assistant integrated into a React/Vite portfolio
and deployed with Vercel.

## Overview

The final architecture is:

``` text
Visitor
   ↓
React AIChat.jsx
   ↓
POST /api/chat
   ↓
Vercel Serverless Function
   ↓
Google Gemini generateContent API
   ↓
AI response
   ↓
React chatbot
```

The Gemini API key stays on the server and is supplied through
environment variables.

## Technologies

-   React
-   Vite
-   JavaScript
-   CSS
-   Lucide React
-   Vercel Serverless Functions
-   Google Gemini API
-   Git/GitHub

## Features

-   Floating AI chat button
-   Expandable chat window
-   User/assistant messages
-   Loading indicator
-   Suggested questions
-   Auto-scroll
-   Portfolio-specific AI context
-   Server-side Gemini API integration
-   Vercel production deployment

Example questions:

``` text
Who is Rahul?
What are Rahul's best projects?
What technologies does Rahul know?
Tell me about his AI/ML work.
```

------------------------------------------------------------------------

## 1. Chatbot Frontend

The chatbot UI is implemented in:

``` text
src/components/AIChat/AIChat.jsx
src/components/AIChat/AIChat.css
```

The React component manages:

-   Opening and closing the chatbot
-   Input state
-   Message history
-   Loading state
-   Suggested questions
-   API requests
-   Error handling

The frontend sends the visitor's message to:

``` text
POST /api/chat
```

Example:

``` js
const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message,
  }),
});
```

The React frontend does **not** call Gemini directly.

That prevents the Gemini API key from being exposed in browser code.

------------------------------------------------------------------------

## 2. Environment Variables

The local `.env` file contains:

``` env
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

The real API key must never be committed to GitHub.

`.gitignore` should contain:

``` gitignore
.env
.env.local
```

`.env.example` can contain placeholders:

``` env
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

Never put the real key in `.env.example`.

------------------------------------------------------------------------

## 3. Portfolio Context

The server-side chatbot prompt tells Gemini that it is Rahul's portfolio
assistant.

The context contains information about:

-   Full-Stack Development
-   Web Development
-   React and JavaScript
-   Python
-   AI/ML
-   Computer Vision
-   Problem Solving
-   Quantum-Inspired Ant Colony Optimization
-   Travelling Salesman Problem research
-   Projects
-   Contact information

The prompt also instructs Gemini not to invent achievements, companies,
jobs, degrees, technologies, or experience.

This makes the assistant more focused on the actual portfolio instead of
behaving like a general-purpose chatbot.

------------------------------------------------------------------------

# 🚨 Problems Faced and How They Were Fixed

## Problem 1 --- OpenAI API Did Not Work

The first implementation used OpenAI.

The frontend loaded correctly, but API requests produced errors
including:

``` text
Incorrect API key provided
```

and later:

``` text
You have no credits remaining
```

### Solution

The chatbot backend was migrated from OpenAI to Google Gemini.

The environment variables became:

``` env
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

The React UI did not need to be rewritten.

------------------------------------------------------------------------

## Problem 2 --- Vercel `ERR_REQUIRE_ESM`

During deployment, Vercel produced:

``` text
Error [ERR_REQUIRE_ESM]:
require() of ES Module /var/task/server-chat-core.mjs
from /var/task/api/chat.js not supported.
```

### Cause

The backend mixed CommonJS `require()` with an ES Module `.mjs` file.

The old structure was effectively:

``` text
api/chat.js
   ↓
server-chat-core.mjs
   ↓
Gemini
```

### Solution

The unnecessary module chain was removed.

The final backend became:

``` text
api/chat.js
   ↓
Gemini REST API
```

This removed the CommonJS/ESM compatibility problem.

------------------------------------------------------------------------

## Problem 3 --- Wrong Gemini Endpoint

Vercel logs showed that the deployed application was calling:

``` text
/v1beta/interactions
```

The External APIs section showed:

``` text
POST
generativelanguage.googleapis.com/v1beta/interactions
```

The chatbot still failed to generate the expected response.

### Solution

The backend was changed to use Gemini's `generateContent` endpoint:

``` text
https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
```

The request uses:

``` js
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
```

The important production check was that Vercel should show:

``` text
/v1beta/models/gemini-3.6-flash:generateContent
```

instead of:

``` text
/v1beta/interactions
```

------------------------------------------------------------------------

## Problem 4 --- Vercel Environment Variables

The chatbot worked locally but failed in production.

The local `.env` file does not automatically become a Vercel production
environment variable.

The following variables were added to Vercel:

``` text
GEMINI_API_KEY
GEMINI_MODEL
```

`GEMINI_API_KEY` was configured for the **Production** environment.

After changing environment variables, a new deployment was required.

------------------------------------------------------------------------

## Problem 5 --- Vercel Returned HTTP 500

Vercel initially showed:

``` text
POST /api/chat
Status: 500
```

and:

``` text
External APIs: No outgoing requests
```

This indicated that the serverless function was failing before reaching
Gemini.

Diagnostic logging was added:

``` js
console.log(
  "Gemini API key configured:",
  Boolean(apiKey)
);

console.log("Gemini model:", model);
```

The actual API key was never printed.

This helped distinguish a missing environment variable from a Gemini API
problem.

------------------------------------------------------------------------

## Problem 6 --- HTTP 200 but No Useful Answer

After fixing the serverless function, Vercel showed:

``` text
POST /api/chat
Status: 200
```

but the chatbot still did not show the expected AI answer.

The Vercel External APIs log revealed that the old backend was still
calling:

``` text
/v1beta/interactions
```

The backend was therefore replaced with a simpler direct
`generateContent` implementation.

------------------------------------------------------------------------

## Problem 7 --- Response Field Mismatch

The frontend originally expected:

``` js
data.reply
```

The new backend returned:

``` json
{
  "answer": "..."
}
```

The frontend response handling was made compatible:

``` js
const answer =
  data.answer ||
  data.reply ||
  data.response ||
  data.message;
```

Then:

``` js
setMessages((prev) => [
  ...prev,
  {
    role: "assistant",
    content: answer,
  },
]);
```

This prevents a valid backend response from appearing as an empty
chatbot message.

------------------------------------------------------------------------

# 🔧 Final Backend

The important file is:

``` text
api/chat.js
```

The final backend:

1.  Accepts `POST`.
2.  Validates the visitor message.
3.  Reads `GEMINI_API_KEY`.
4.  Reads `GEMINI_MODEL`.
5.  Builds the portfolio prompt.
6.  Calls Gemini `generateContent`.
7.  Extracts the generated text.
8.  Returns:

``` json
{
  "answer": "..."
}
```

The backend does not expose the Gemini API key to the browser.

------------------------------------------------------------------------

# 🧪 Local Testing

Install dependencies:

``` bash
npm install
```

Add `.env`:

``` env
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

Run:

``` bash
npm run dev
```

Open the Vite development URL, normally:

``` text
http://localhost:5173
```

Test:

``` text
Who is Rahul?
```

If the answer appears locally, test the production deployment
separately.

------------------------------------------------------------------------

# 🚀 Vercel Deployment

The deployment process was:

``` text
1. Test locally
2. Commit changes
3. Push to GitHub
4. Deploy through Vercel
5. Add production environment variables
6. Redeploy
7. Test /api/chat
8. Inspect Vercel Logs
```

Vercel environment variables:

``` text
GEMINI_API_KEY = actual Gemini API key
GEMINI_MODEL = gemini-3.6-flash
```

After changing environment variables, redeploy the project.

------------------------------------------------------------------------

# 🔍 Production Debugging Method

The Vercel Logs were critical.

The debugging process was:

``` text
Frontend
   ↓
Network request
   ↓
POST /api/chat
   ↓
HTTP status
   ↓
Vercel Function Invocation
   ↓
External API
   ↓
Gemini response
   ↓
Frontend response handling
```

Examples:

### HTTP 500

``` text
POST /api/chat → 500
External APIs → No outgoing requests
```

This indicated a server-side failure before Gemini.

### HTTP 200

``` text
POST /api/chat → 200
```

This confirmed the Vercel function was executing.

Then the External APIs section showed which Gemini endpoint was actually
being called.

This was how the incorrect `/v1beta/interactions` implementation was
identified.

------------------------------------------------------------------------

# 🔒 Security

Never put the Gemini API key inside:

``` text
AIChat.jsx
```

or any frontend JavaScript file.

Do not do:

``` js
const apiKey = "AIza...";
```

The correct architecture is:

``` text
Browser
   ↓
/api/chat
   ↓
Vercel server
   ↓
process.env.GEMINI_API_KEY
   ↓
Gemini
```

Also make sure:

``` gitignore
.env
.env.local
```

are ignored by Git.

If an API key is accidentally exposed publicly, revoke it and generate a
replacement.

------------------------------------------------------------------------

# 📁 Final Relevant Structure

``` text
portfolio/
│
├── api/
│   └── chat.js
│
├── src/
│   └── components/
│       └── AIChat/
│           ├── AIChat.jsx
│           └── AIChat.css
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── ...
```

------------------------------------------------------------------------

# 📊 Final Architecture

``` text
                    ┌───────────────────┐
                    │      Visitor      │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │   React AIChat    │
                    │     component     │
                    └─────────┬─────────┘
                              │
                        POST /api/chat
                              │
                              ▼
                    ┌───────────────────┐
                    │ Vercel Serverless │
                    │    api/chat.js    │
                    └─────────┬─────────┘
                              │
                     GEMINI_API_KEY
                              │
                              ▼
                    ┌───────────────────┐
                    │   Google Gemini   │
                    │  generateContent  │
                    └─────────┬─────────┘
                              │
                         AI response
                              │
                              ▼
                    ┌───────────────────┐
                    │   React Chat UI   │
                    └───────────────────┘
```

------------------------------------------------------------------------

# ✅ Final Checklist

-   [x] React chatbot UI
-   [x] Floating chat launcher
-   [x] Suggested questions
-   [x] Loading indicator
-   [x] Portfolio-specific AI context
-   [x] Gemini integration
-   [x] Server-side API key
-   [x] `.env` configuration
-   [x] Vercel environment variables
-   [x] Vercel serverless API route
-   [x] Gemini `generateContent` endpoint
-   [x] CommonJS/ESM deployment issue fixed
-   [x] OpenAI replaced with Gemini
-   [x] Response-field mismatch fixed
-   [x] Production deployment tested
-   [x] Vercel logs used for debugging

------------------------------------------------------------------------

# 🎯 Result

Rahul's portfolio now includes a **portfolio-aware AI assistant**.

Visitors can interact with the portfolio conversationally instead of
manually searching through every section.

The final production architecture keeps the Gemini API key on the server
and uses Vercel as the secure bridge between the React frontend and
Gemini.
