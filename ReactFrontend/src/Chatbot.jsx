import { useState } from "react";
import { sendChatMessage } from "./api";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! 👋 I'm your AI assistant. How can I help you?"
    }
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        content: trimmedMessage
      }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const result = await sendChatMessage(trimmedMessage);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: result.response
        }
      ]);
    } catch (error) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: "Sorry, I could not connect to the AI service."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {isOpen && (
        <div className="chatbot-window">

          <div className="chatbot-header">
            <div>
              <strong>🤖 AI Assistant</strong>
              <span>Powered by Ollama</span>
            </div>

            <button
              type="button"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`chat-message ${item.role}`}
              >
                <div className="chat-message-content">
                  {item.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message assistant">
                <div className="chat-message-content">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="chatbot-input-area">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              rows="2"
              disabled={loading}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !message.trim()}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>

        </div>
      )}

      {!isOpen && (
        <button
          type="button"
          className="chatbot-floating-button"
          onClick={() => setIsOpen(true)}
        >
          🤖
        </button>
      )}
    </>
  );
}

export default Chatbot;