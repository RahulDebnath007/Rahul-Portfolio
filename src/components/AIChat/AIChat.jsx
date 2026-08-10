import React, { useEffect, useRef, useState } from "react";
import { Bot, ChevronDown, MessageCircle, Send, Sparkles, X } from "lucide-react";
import "./AIChat.css";

const SUGGESTIONS = [
  "Who is Rahul?",
  "What are Rahul's best projects?",
  "What technologies does Rahul know?",
  "Tell me about his AI/ML work.",
];

const initialMessage = {
  role: "assistant",
  content:
    "Hi! I'm Rahul's AI portfolio assistant. Ask me about his skills, projects, education, research, or how to contact him.",
};

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const sendMessage = async (text = input) => {
    const message = text.trim();
    if (!message || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        const details = data.details ? ` ${data.details}` : "";
        throw new Error((data.error || "Unable to get a response.") + details);
      }

      setMessages((prev) => [
  ...prev,
  {
    role: "assistant",
    content: data.answer || data.reply,
  },
]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            import.meta.env.DEV
              ? `AI assistant error: ${error.message}`
              : "Sorry, I couldn't connect to the AI service right now. Please use the Contact or Resume section instead.",
        },
      ]);
      console.error("AI chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <>
      {open && (
        <section className="ai-chat-panel" aria-label="Rahul AI portfolio assistant">
          <header className="ai-chat-header">
            <div className="ai-chat-brand">
              <div className="ai-chat-avatar">
                <Sparkles size={18} />
              </div>
              <div>
                <strong>Rahul AI Assistant</strong>
                <span><i /> Portfolio-aware assistant</span>
              </div>
            </div>

            <button
              className="ai-chat-icon-button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={19} />
            </button>
          </header>

          <div className="ai-chat-messages" ref={messagesRef}>
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`ai-chat-row ${message.role}`}
              >
                {message.role === "assistant" && (
                  <div className="ai-mini-avatar"><Bot size={14} /></div>
                )}
                <div className="ai-chat-bubble">{message.content}</div>
              </div>
            ))}

            {messages.length === 1 && !loading && (
              <div className="ai-suggestions">
                <span>Try asking:</span>
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="ai-chat-row assistant">
                <div className="ai-mini-avatar"><Bot size={14} /></div>
                <div className="ai-chat-bubble ai-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          <form className="ai-chat-input" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Rahul..."
              maxLength={1000}
              disabled={loading}
              aria-label="Ask Rahul AI Assistant"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </form>

          <div className="ai-chat-footer">
            AI answers are based on information in this portfolio.
          </div>
        </section>
      )}

      <button
        className={`ai-chat-launcher ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? <ChevronDown size={25} /> : <MessageCircle size={25} />}
        {!open && <span className="ai-chat-pulse" />}
      </button>
    </>
  );
}
