import React from "react";

export default function ConversationList({
  conversations,
  selectedConv,
  handleSelectConv,
  user,
  loading,
  error,
}) {
  return (
    <div className="flex-1 overflow-y-auto">
      {loading ? (
        <p className="p-4">Loading...</p>
      ) : error ? (
        <p className="text-red-500 p-4">{error}</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {conversations.length === 0 ? (
            <li className="py-3 px-4 text-gray-500 text-sm">
              No conversations found.
            </li>
          ) : (
            conversations.map((conv) => (
              <li
                key={conv._id}
                className={`py-3 px-4 cursor-pointer text-sm hover:bg-gray-50 ${
                  selectedConv && selectedConv._id === conv._id
                    ? "bg-blue-100"
                    : ""
                }`}
                onClick={() => handleSelectConv(conv)}
              >
                {conv.isGroup ? (
                  <span className="font-semibold">{conv.name}</span>
                ) : (
                  <span>
                    {conv.members
                      .filter((m) => m._id !== user._id)
                      .map((m) => m.username)
                      .join(", ")}
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
