import React from "react";

export default function MessageList({ messages, currentUser }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {messages.map((msg) => {
        // Support both msg.sender and msg.sender._id, fallback to msg.sender if it's a string
        let senderId =
          typeof msg.sender === "object" ? msg.sender?._id : msg.sender;
        const isCurrentUser = String(senderId) === String(currentUser?._id);

        return (
          <div
            key={msg._id}
            className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
              isCurrentUser
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            <div className="text-xs opacity-75 mb-1">
              {typeof msg.sender === "object" ? msg.sender?.username : ""}{" "}
              {isCurrentUser ? "(You)" : ""}
            </div>
            <span>{msg.text}</span>
          </div>
        );
      })}
    </div>
  );
}
