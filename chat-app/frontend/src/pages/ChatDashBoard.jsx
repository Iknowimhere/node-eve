import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import GroupChatModal from "../components/GroupChatModal";
import UserSearch from "../components/UserSearch";
import ConversationList from "../components/ConversationList";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import axios from "../lib/axios";
import socket from "../socket";


const ChatDashBoard = () => {
  const { user, logout, token } = useAuth();
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [groupSearch, setGroupSearch] = useState("");
  const [groupSearchLoading, setGroupSearchLoading] = useState(false);
  const [groupSearchError, setGroupSearchError] = useState(null);
  const [groupSearchResults, setGroupSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const socketRef = useRef(null);

  const handleGroupUserSearch = async (e) => {
    e.preventDefault();
    if (!e.target.value.trim()) {
      setGroupSearch("");
      setGroupSearchResults([]);
      return;
    }
    setGroupSearch(e.target.value.trim());
    setGroupSearchLoading(true);
    setGroupSearchError("");
    try {
      const res = await axios.get(
        `/users?search=${encodeURIComponent(groupSearch)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status == 200) {
        // Exclude already selected members and self
        const filtered = res.data.filter(
          (u) => !selectedGroupMembers.includes(u._id) && u._id !== user._id
        );
        setGroupSearchResults(filtered);
      } else {
        setGroupSearchError(res.data.error || "Search failed");
      }
    } catch (error) {
      console.log(error);

      setGroupSearchError("Search failed");
      setGroupSearchResults([]);
    }
    setGroupSearchLoading(false);
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!groupName || selectedGroupMembers.length === 0) {
      setError("Group name and members are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "/conversations",
        {
          name: groupName,
          isGroup: true,
          members: selectedGroupMembers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 201) {
        if (res.data && Array.isArray(res.data.members)) {
          res.data.members = selectedGroupMembers;
        }
        // Group created successfully
        setConversations((prev) => [res.data, ...prev]);
        setShowGroupModal(false);
        setGroupName("");
        setSelectedGroupMembers([]);
        setGroupSearch("");
        setGroupSearchResults([]);
      } else {
        setError(res.data.error || "Failed to create group");
      }
    } catch (error) {
      setError("Failed to create group");
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    setSearchError("");
    try {
      const res = await axios.get(
        `/users?search=${encodeURIComponent(search)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      if (res.status === 200) {
        setSearchResults(data);
      } else {
        setSearchError(data.error || "Failed to search users");
      }
    } catch (err) {
      setSearchError("Network error");
    }
    setSearchLoading(false);
  };
  const startConversation = async (userId) => {
    try {
      const res = await axios.post(
        "/conversations",
        {
          members: [userId],
          isGroup: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      if (res.status === 201) {
        setConversations((prev) => [
          data,
          ...prev.filter((c) => c._id !== data._id),
        ]);
        setSearchResults([]);
        setSearch("");
        // setSelectedConv(data);
        // fetchMessages(data._id);
      } else {
        console.log(data);

        setSearchError(data.error || "Failed to start conversation");
      }
    } catch (err) {
      console.log(err);

      setSearchError("Network error");
    }
  };

  const fetchMessages = async (convId) => {
    setMessagesLoading(true);
    setMessagesError("");
    try {
      const res = await axios.get(`/conversations/${convId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      if (res.status === 200) {
        setMessages(data);
      } else {
        setMessagesError(data.error || "Failed to fetch messages");
      }
    } catch (err) {
      setMessagesError("Network error");
    }
    setMessagesLoading(false);
  };

  useEffect(() => {
    if (!socketRef.current || !selectedConv) return;

    const handleNewMessage = (msg) => {
      // Only add message if it belongs to the current conversation and not already present
      if (
        msg.conversationId === selectedConv._id &&
        !messages.some((m) => m._id === msg._id)
      ) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }
    };

    socketRef.current.on("newMessage", handleNewMessage);

    return () => {
      socketRef.current.off("newMessage", handleNewMessage);
    };
  }, [selectedConv]);

  const handleSelectConv = (conv) => {
    setSelectedConv(conv);
    fetchMessages(conv._id);
    if (socketRef.current && conv && conv._id) {
      socketRef.current.emit("joinConversation", conv._id);
    } else {
      console.log("not emitting joinConversation, socket or conv invalid", {
        socket: !!socketRef.current,
        conv,
      });
    }
  };

  const handleSendMessage = async (text) => {
    if (!selectedConv) return;
    setMessagesLoading(true);
    setMessagesError("");
    try {
      let res = await axios.post(
        `/messages/${selectedConv._id}/`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        // setMessages((prev) => {
        //   if (prev.some((m) => m._id === res.data._id)) return prev;
        //   return [...prev, res.data];
        // });
        //emit socket event
        if (socketRef.current) {
          socketRef.current.emit("sendMessage", {
            conversationId: selectedConv._id,
            ...res.data,
          });
        }
      } else {
        setMessagesError(res.data.error || "Failed to send message");
      }
    } catch (err) {
      setMessagesError("Network error");
    }
    setMessagesLoading(false);
  };

  //configure socket
  useEffect(() => {
    if (token && !socketRef.current) {
      socket.auth = { token };
      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("socket connected", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("socket connect_error", err);
      });

      socket.on("disconnect", (reason) => {
        console.log("socket disconnected", reason);
      });

      socket.connect();
      console.log("socket: connecting...", socket);
    }
  }, [token]);

  // fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!token) return;
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/conversations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setConversations(res.data);
        } else {
          setError(res.data.error || "Failed to fetch conversations");
        }
      } catch (err) {
        setError("Network error");
      }
      setLoading(false);
    };
    fetchConversations();
  }, [token]);

  return (
    <div className="h-screen bg-gray-100 flex">
      <div className="w-1/3 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Welcome, {user?.username}</h2>
            <button
              onClick={logout}
              className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
          <h3 className="text-lg font-semibold">Your Conversations</h3>
        </div>
        {/* Create Group Button */}
        <button
          className="w-full py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 mb-4"
          onClick={() => setShowGroupModal(true)}
        >
          Create Group Chat
        </button>
        {/* Group Chat Modal */}
        {showGroupModal && (
          <GroupChatModal
            show={showGroupModal}
            onClose={() => setShowGroupModal(false)}
            groupName={groupName}
            setGroupName={setGroupName}
            selectedGroupMembers={selectedGroupMembers}
            setSelectedGroupMembers={setSelectedGroupMembers}
            groupSearch={groupSearch}
            setGroupSearch={setGroupSearch}
            groupSearchLoading={groupSearchLoading}
            groupSearchError={groupSearchError}
            groupSearchResults={groupSearchResults}
            handleGroupUserSearch={handleGroupUserSearch}
            handleCreateGroup={handleCreateGroup}
          />
        )}
        <UserSearch
          search={search}
          setSearch={setSearch}
          searchLoading={searchLoading}
          searchError={searchError}
          searchResults={searchResults}
          handleSearch={handleSearch}
          startConversation={startConversation}
        />

        {/* Conversations List - Scrollable */}
        <ConversationList
          conversations={conversations}
          selectedConv={selectedConv}
          handleSelectConv={handleSelectConv}
          user={user}
          loading={loading}
          error={error}
        />
      </div>
      {/* right panel */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-gray-50">
              <h4 className="text-lg font-semibold">
                {selectedConv.isGroup ? (
                  <>
                    Group: {selectedConv.name}
                    <span className="block text-xs font-normal mt-1 text-gray-600">
                      Members:{" "}
                      {selectedConv.members.map((m) => m.username).join(", ")}
                    </span>
                  </>
                ) : (
                  <>
                    Chat with{" "}
                    {selectedConv.members
                      .filter((m) => m._id !== user._id)
                      .map((m) => m.username)
                      .join(", ")}
                  </>
                )}
              </h4>
            </div>

            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {messagesLoading ? (
                <p>Loading messages...</p>
              ) : messagesError ? (
                <p className="text-red-500">{messagesError}</p>
              ) : (
                <MessageList messages={messages} currentUser={user} />
              )}
            </div>
            {/* Message Input - Fixed at bottom */}
            <div className="p-4 border-t bg-gray-50">
              <MessageInput
                onSend={handleSendMessage}
                disabled={messagesLoading}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <h3 className="text-xl mb-2">Welcome to Chat</h3>
              <p>Select a conversation from the left to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashBoard;
