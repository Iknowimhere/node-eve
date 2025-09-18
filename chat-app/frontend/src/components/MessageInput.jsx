import React, { useState } from "react";

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type a message..."
        disabled={disabled}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
}
