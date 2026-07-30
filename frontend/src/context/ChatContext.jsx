import { createContext, useState, useEffect } from "react";
import { sendPrompt } from "../services/chatService";

// Create Context
export const ChatContext = createContext();

// Provider Component
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // Load chats from localStorage
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("gemini_chats");
    return savedChats ? JSON.parse(savedChats) : [];
  });

  // Current opened chat
  const [currentChatId, setCurrentChatId] = useState(null);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  

  // Animate AI response
  const animateResponse = async (reply) => {
    if (!reply) return;

    const words = reply.split(" ");

    // Add assistant message
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
      },
    ]);

    let current = "";

    for (let i = 0; i < words.length; i++) {
      current += words[i] + " ";

      await new Promise((resolve) => setTimeout(resolve, 10));

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: current,
        };

        return updated;
      });
    }
  };

  // Send Message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const currentPrompt = input.trim();

    // Update title if first prompt
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === currentChatId && chat.title === "New Chat") {
          return {
            ...chat,
            title:
              currentPrompt.length > 30
                ? currentPrompt.slice(0, 30) + "..."
                : currentPrompt,
          };
        }

        return chat;
      })
    );

    // Add user + thinking
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentPrompt,
      },
      {
        role: "assistant",
        content: "",
        loading: true,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const reply = await sendPrompt(currentPrompt);

      // Remove thinking bubble
      setMessages((prev) => prev.slice(0, -1));

      // Animate assistant reply
      await animateResponse(reply);
    } catch (error) {
      console.error(error);

      setMessages((prev) => {
        const updated = prev.slice(0, -1);

        updated.push({
          role: "assistant",
          content: "❌ Something went wrong.",
        });

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  // Create new chat
  const newChat = () => {
    const id = Date.now();

    const chat = {
      id,
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [chat, ...prev]);

    setCurrentChatId(id);
    setMessages([]);
  };

  // Open chat
  const openChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);

    if (!chat) return;

    setCurrentChatId(chatId);
    setMessages(chat.messages || []);
  };

  const deleteChat = (chatId) => {
  const updatedChats = chats.filter((chat) => chat.id !== chatId);

  setChats(updatedChats);

  // If deleted chat is currently open
  if (currentChatId === chatId) {
    if (updatedChats.length > 0) {
      setCurrentChatId(updatedChats[0].id);
      setMessages(updatedChats[0].messages || []);
    } else {
      setCurrentChatId(null);
      setMessages([]);
    }
  }
};

const renameChat = (chatId, newTitle) => {
  if (!newTitle.trim()) return;

  setChats((prev) =>
    prev.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            title: newTitle.trim(),
          }
        : chat
    )
  );
};

  // Sync messages with current chat
  useEffect(() => {
    if (!currentChatId) return;

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages,
            }
          : chat
      )
    );
  }, [messages, currentChatId]);

  // Save chats
  useEffect(() => {
    localStorage.setItem("gemini_chats", JSON.stringify(chats));
  }, [chats]);

  const filteredChats = chats.filter((chat) =>
  chat.title.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <ChatContext.Provider
      value={{
        messages,
        chats,
        filteredChats,
        currentChatId,
        input,
        loading,
        searchQuery,
        setSearchQuery,
        

        setInput,
        setMessages,
        setChats,
        setCurrentChatId,

        sendMessage,
        newChat,
        openChat,
        deleteChat,
        renameChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};