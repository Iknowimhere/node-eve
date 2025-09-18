import React from "react";

export default function MessageList({ messages, currentUser }) {
  console.log("MessageList currentUser:", currentUser);

  return (
    <div className="flex flex-col gap-2 mb-4">
      {messages.map((msg) => {
        console.log("Message data:", {
          msgSender: msg.sender,
          currentUser: currentUser,
          senderId: msg.sender?._id,
          currentUserId: currentUser?._id,
          senderIdType: typeof msg.sender?._id,
          currentUserIdType: typeof currentUser?._id,
        });

        const isCurrentUser =
          String(msg.sender?._id) === String(currentUser?._id);
        console.log("Message alignment:", {
          text: msg.text,
          isCurrentUser,
          senderName: msg.sender?.username,
        });

        return (
          <div
            key={msg._id}
            className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
              isCurrentUser
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            <div className="text-xs opacity-75 mb-1">
              {msg.sender?.username} {isCurrentUser ? "(You)" : ""}
            </div>
            <span>{msg.text}</span>
          </div>
        );
      })}
    </div>
  );
}
