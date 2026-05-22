"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;

    setChat((prev) => [...prev, "You: " + userMsg]);
    setMessage("");

    try {
      const res = await fetch(
        "https://fibsol-backend-production.up.railway.app/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMsg }),
        }
      );

      const data = await res.json();

      setChat((prev) => [...prev, "Bot: " + data.reply]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        "Bot: Error connecting to server.",
      ]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[500px] bg-white shadow-xl rounded-xl p-4">

        <div className="h-[400px] overflow-y-auto border p-2 mb-3 rounded">
          {chat.map((c, i) => (
            <p key={i} className="mb-2 whitespace-pre-wrap">
              {c}
            </p>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="border flex-1 p-2 rounded outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}