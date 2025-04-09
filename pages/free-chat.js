// pages/free-chat.js
import { useState } from "react";

export default function FreeChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [wantsFollowUp, setWantsFollowUp] = useState(false);

  // 1. Send user message to /api/chat
  async function handleSend() {
    if (!input.trim()) return;

    // Add user message to local state
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // Call the chat API route
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: input }),
    });
    const data = await res.json();

    if (data.assistantMessage) {
      // Append AI response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.assistantMessage },
      ]);
    } else if (data.error) {
      console.error("Chat error:", data.error);
    }

    setInput("");
  }

  // 2. Finish Chat & Email PDF
  async function handleFinish() {
    if (!userEmail) {
      alert("Please enter your email address to receive the PDF.");
      return;
    }

    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        userEmail,
        wantsFollowUp,
      }),
    });

    if (res.ok) {
      alert("Your PDF has been emailed!");
    } else {
      alert("Error generating/sending PDF.");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Free Family Law Chat
      </h1>

      {/* Chat display */}
      <div className="bg-gray-100 border border-gray-300 p-4 rounded shadow mb-4">
        <div className="h-64 overflow-y-auto px-2 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className="mb-2">
              <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
        </div>
        {/* Input to send new messages */}
        <div className="flex mb-4">
          <input
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* PDF Email Section */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Your Email (to receive PDF):
        </label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="you@example.com"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="followUp"
          checked={wantsFollowUp}
          onChange={(e) => setWantsFollowUp(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="followUp">I would like a follow-up from you</label>
      </div>

      <button
        onClick={handleFinish}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Finish Chat & Email PDF
      </button>
    </main>
  );
}
