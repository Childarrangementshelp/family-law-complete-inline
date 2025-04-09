import { useState } from "react";

export default function FreeChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to local chat
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // Call our /api/chat route
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: input }),
    });

    const data = await res.json();

    if (data.assistantMessage) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.assistantMessage },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: No response from AI" },
      ]);
    }

    setInput("");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Free Family Law Chat (Proof of Concept)
      </h1>

      <div className="bg-gray-100 border border-gray-300 p-4 rounded shadow">
        <div className="h-64 overflow-y-auto px-2 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className="mb-2">
              <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Ask about family law..."
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

      <p className="text-sm text-center text-gray-500 mt-6">
        Content generated is for informational purposes only and must not be relied upon
        as legal advice. Family Law Information shall not be liable for any actions
        taken based on this advice. Consult with qualified legal professionals for specifics.
      </p>
    </main>
  );
}
