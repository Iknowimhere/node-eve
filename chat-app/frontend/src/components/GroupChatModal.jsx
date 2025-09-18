import React from "react";

export default function GroupChatModal({
  show,
  onClose,
  groupName,
  setGroupName,
  selectedGroupMembers,
  setSelectedGroupMembers,
  groupError,
  groupSearch,
  setGroupSearch,
  groupSearchResults,
  groupSearchLoading,
  groupSearchError,
  handleGroupUserSearch,
  handleCreateGroup,
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-4">Create Group Chat</h3>
        <form onSubmit={handleCreateGroup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div>
            <div className="mb-2 font-semibold text-sm">
              Search and Select Members:
            </div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Search users..."
                value={groupSearch}
                onChange={handleGroupUserSearch}
                className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
              <button
                type="button"
                className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                onClick={handleGroupUserSearch}
              >
                Search
              </button>
            </div>
            {groupSearchLoading && <p className="text-sm">Searching...</p>}
            {groupSearchError && (
              <p className="text-red-500 text-sm">{groupSearchError}</p>
            )}
            <div className="max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
              {groupSearchResults.length > 0 ? (
                groupSearchResults.map((u) => (
                  <label key={u._id} className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      checked={selectedGroupMembers.some(
                        (m) => m._id === u._id
                      )}
                      onChange={(e) => {
                        setSelectedGroupMembers((prev) => {
                          if (e.target.checked) {
                            // Add user object if not already present
                            return prev.some((m) => m._id === u._id)
                              ? prev
                              : [...prev, u];
                          } else {
                            // Remove user object
                            return prev.filter((m) => m._id !== u._id);
                          }
                        });
                      }}
                    />
                    <span>{u.username}</span>
                  </label>
                ))
              ) : (
                <span className="text-gray-400 text-xs">
                  Search users to add
                </span>
              )}
            </div>
            {/* Show selected members */}
            {selectedGroupMembers.length > 0 && (
              <div className="mt-2 text-xs text-gray-700">
                <span className="font-semibold">Selected Members:</span>
                <ul className="list-disc ml-4">
                  {selectedGroupMembers.map((user) => (
                    <li key={user._id}>{user.username}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Create Group
          </button>
          {groupError && (
            <p className="text-red-500 text-center">{groupError}</p>
          )}
        </form>
      </div>
    </div>
  );
}
