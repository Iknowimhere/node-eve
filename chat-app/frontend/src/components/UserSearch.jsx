import React from "react";

export default function UserSearch({
  search,
  setSearch,
  searchLoading,
  searchError,
  searchResults,
  handleSearch,
  startConversation,
}) {
  return (
    <div className="p-4 border-b">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Search
        </button>
      </form>
      {searchLoading && <p className="text-sm mt-2">Searching...</p>}
      {searchError && (
        <p className="text-red-500 text-sm mt-2">{searchError}</p>
      )}
      {searchResults.length > 0 && (
        <ul className="mt-2 divide-y divide-gray-200 bg-gray-50 rounded">
          {searchResults.map((u) => (
            <li
              key={u._id}
              className="py-2 px-3 flex justify-between items-center"
            >
              <span className="text-sm">{u.username}</span>
              <button
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                onClick={() => startConversation(u._id)}
              >
                Start Chat
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
