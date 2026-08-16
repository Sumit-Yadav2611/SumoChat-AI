import { createContext, useState, useEffect } from "react";

import {
  getChats,
  createChat,
  getChatMessages,
  sendPrompt,
  sendGuestPrompt,
  generateImage,
  renameChat as renameChatAPI,
  deleteChat as deleteChatAPI,
} from "../services/chatService";

import { useAuth } from "./AuthContext";

// ============================================================
// CREATE CONTEXT
// ============================================================

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user, token } = useAuth();

  // ============================================================
  // CHAT STATE
  // ============================================================

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Prevent duplicate New Chat creation
  const [creatingChat, setCreatingChat] = useState(false);

  // ============================================================
  // UPLOAD STATE
  // ============================================================

  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // ============================================================
  // UI STATE
  // ============================================================

  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ============================================================
  // GUEST
  // ============================================================

  const isGuest = !token;

  const FREE_MESSAGE_LIMIT = 3;

  const [guestMessageCount, setGuestMessageCount] = useState(() => {
    return Number(localStorage.getItem("guest_message_count")) || 0;
  });

  const guestStorageKey = "guest_chats";

  // ============================================================
  // ANIMATE AI RESPONSE
  // ============================================================

  const animateResponse = async (reply) => {
    if (!reply) return;

    const words = reply.split(" ");

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

        if (updated.length === 0) {
          return prev;
        }

        const lastIndex = updated.length - 1;

        updated[lastIndex] = {
          ...updated[lastIndex],
          content: current,
        };

        return updated;
      });
    }
  };

  // ============================================================
  // LOAD LOGGED-IN USER CHATS
  // ============================================================

  useEffect(() => {
    const loadUserChats = async () => {
      if (!token || !user) return;

      try {
        const userChats = await getChats(token);

        setChats(userChats || []);
        setCurrentChatId(null);
        setMessages([]);
      } catch (error) {
        console.error("Failed to load chat history:", error);

        setChats([]);
        setCurrentChatId(null);
        setMessages([]);
      }
    };

    loadUserChats();
  }, [token, user]);

  // ============================================================
  // LOAD GUEST CHATS
  // ============================================================

  useEffect(() => {
    if (!isGuest) return;

    try {
      const savedChats = localStorage.getItem(guestStorageKey);

      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);

        setChats(parsedChats || []);
      } else {
        setChats([]);
      }
    } catch (error) {
      console.error("Failed to load guest chats:", error);

      setChats([]);
    }

    setCurrentChatId(null);
    setMessages([]);
  }, [isGuest]);

  // ============================================================
  // SAVE GUEST CHATS
  // ============================================================

  useEffect(() => {
    if (!isGuest) return;

    try {
      localStorage.setItem(guestStorageKey, JSON.stringify(chats));
    } catch (error) {
      console.error("Failed to save guest chats:", error);
    }
  }, [chats, isGuest]);

  // ============================================================
  // CREATE NEW CHAT
  // ============================================================

  const newChat = async () => {
    if (creatingChat) return;

    // ========================================================
    // GUEST
    // ========================================================

    if (isGuest) {
      const existingEmptyChat = chats.find(
        (chat) =>
          chat.title === "New Chat" &&
          (!chat.messages || chat.messages.length === 0),
      );

      if (existingEmptyChat) {
        setCurrentChatId(existingEmptyChat.id);
        setMessages(existingEmptyChat.messages || []);

        setUploadedDocument(null);
        setUploadedImage(null);

        return;
      }

      const id = Date.now();

      const chat = {
        id,
        title: "New Chat",
        messages: [],
      };

      setChats((prev) => [chat, ...prev]);

      setCurrentChatId(id);
      setMessages([]);

      setUploadedDocument(null);
      setUploadedImage(null);

      return;
    }

    // ========================================================
    // LOGGED-IN USER
    // ========================================================

    const currentChat = chats.find((chat) => chat._id === currentChatId);

    if (currentChat && currentChat.title === "New Chat") {
      setMessages([]);

      setUploadedDocument(null);
      setUploadedImage(null);

      return;
    }

    const existingEmptyChat = chats.find((chat) => chat.title === "New Chat");

    if (existingEmptyChat) {
      setCurrentChatId(existingEmptyChat._id);
      setMessages([]);

      setUploadedDocument(null);
      setUploadedImage(null);

      return;
    }

    try {
      setCreatingChat(true);

      const chat = await createChat(token);

      setChats((prev) => [chat, ...prev]);

      setCurrentChatId(chat._id);
      setMessages([]);

      setUploadedDocument(null);
      setUploadedImage(null);
    } catch (error) {
      console.error("Failed to create new chat:", error);
    } finally {
      setCreatingChat(false);
    }
  };

  // ============================================================
  // OPEN CHAT
  // ============================================================

  const openChat = async (chatId) => {
    if (!chatId) return;

    // ========================================================
    // GUEST
    // ========================================================

    if (isGuest) {
      const chat = chats.find((c) => c.id === chatId);

      if (!chat) return;

      setCurrentChatId(chatId);

      setMessages(chat.messages || []);

      setUploadedDocument(null);
      setUploadedImage(null);

      return;
    }

    // ========================================================
    // LOGGED-IN USER
    // ========================================================

    try {
      setLoading(true);

      const data = await getChatMessages(chatId, token);

      setCurrentChatId(chatId);

      setMessages(data.messages || []);

      setUploadedDocument(null);
      setUploadedImage(null);
    } catch (error) {
      console.error("Failed to open chat:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // IMAGE GENERATION DETECTION
  // ============================================================

  const isImageGenerationRequest = (prompt) => {
    if (!prompt) return false;

    const text = prompt.toLowerCase().trim();

    const imagePatterns = [
      /\bcreate\s+(an?\s+)?image\b/,
      /\bgenerate\s+(an?\s+)?image\b/,
      /\bmake\s+(an?\s+)?image\b/,
      /\bdraw\b/,
      /\bcreate\s+(an?\s+)?picture\b/,
      /\bgenerate\s+(an?\s+)?picture\b/,
    ];

    return imagePatterns.some((pattern) => pattern.test(text));
  };
  // ============================================================
  // SEND MESSAGE
  // ============================================================

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const currentPrompt = input.trim();

    // ========================================================
    // GUEST LIMIT
    // ========================================================

    if (isGuest && guestMessageCount >= FREE_MESSAGE_LIMIT) {
      setShowLoginModal(true);
      return;
    }

    // ========================================================
    // MAKE SURE GUEST HAS A CHAT
    // ========================================================

    let activeChatId = currentChatId;

    if (isGuest && !activeChatId) {
      const id = Date.now();

      const newGuestChat = {
        id,
        title:
          currentPrompt.length > 30
            ? currentPrompt.slice(0, 30) + "..."
            : currentPrompt,
        messages: [],
      };

      setChats((prev) => [newGuestChat, ...prev]);

      activeChatId = id;

      setCurrentChatId(id);
    }

    // ========================================================
    // ADD USER MESSAGE + THINKING
    // ========================================================

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
      let reply;

      // ======================================================
      // IMAGE GENERATION
      // ======================================================

      const wantsImage = isImageGenerationRequest(currentPrompt);

      if (wantsImage) {
        try {
          // ==================================================
          // LOGGED-IN USER
          // Make sure MongoDB chat exists BEFORE generating
          // ==================================================

          if (!isGuest && !activeChatId) {
            const newChatData = await createChat(token);

            activeChatId = newChatData._id;

            setCurrentChatId(newChatData._id);

            setChats((prev) => [newChatData, ...prev]);
          }

          // ==================================================
          // GENERATE IMAGE
          // ==================================================

          const imageData = await generateImage(
            currentPrompt,
            activeChatId,
            token,
          );

          // ==================================================
          // REMOVE THINKING MESSAGE
          // ==================================================

          setMessages((prev) => prev.slice(0, -1));

          // ==================================================
          // ADD GENERATED IMAGE
          // ==================================================

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              type: "image",
              content: imageData.image,
              mimeType: imageData.mimeType,
              prompt: currentPrompt,
            },
          ]);

          // ==================================================
          // UPDATE CHAT TITLE
          // ==================================================

          if (imageData.chat) {
            setChats((prev) =>
              prev.map((chat) =>
                chat._id === activeChatId ? imageData.chat : chat,
              ),
            );
          }

          return;
        } catch (imageError) {
          console.error("Image generation error:", imageError);

          setMessages((prev) => {
            const updated = prev.slice(0, -1);

            updated.push({
              role: "assistant",
              content:
                imageError.response?.data?.message ||
                imageError.message ||
                "Failed to generate image.",
            });

            return updated;
          });

          return;
        }
      }
      // ======================================================
      // GUEST
      // ======================================================

      if (isGuest) {
        reply = await sendGuestPrompt(currentPrompt, uploadedDocument);
      }

      // ======================================================
      // LOGGED-IN USER
      // ======================================================
      else {
        // If there is no chat yet, create one first.
        if (!activeChatId) {
          const newChatData = await createChat(token);

          activeChatId = newChatData._id;

          setCurrentChatId(newChatData._id);

          setChats((prev) => [newChatData, ...prev]);
        }

        const data = await sendPrompt(
          activeChatId,
          currentPrompt,
          uploadedDocument,
          token,
        );

        reply = data.reply;

        // Update sidebar title
        if (data.chat) {
          setChats((prev) =>
            prev.map((chat) => (chat._id === activeChatId ? data.chat : chat)),
          );
        }
      }

      // ======================================================
      // REMOVE THINKING MESSAGE
      // ======================================================

      setMessages((prev) => prev.slice(0, -1));

      // ======================================================
      // GUEST MESSAGE COUNT
      // ======================================================

      if (isGuest) {
        const count = guestMessageCount + 1;

        setGuestMessageCount(count);

        localStorage.setItem("guest_message_count", count.toString());
      }

      // ======================================================
      // ANIMATE AI RESPONSE
      // ======================================================

      await animateResponse(reply);
    } catch (error) {
      console.error("Send message error:", error);

      setMessages((prev) => {
        const updated = prev.slice(0, -1);

        updated.push({
          role: "assistant",
          content:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        });

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SEND MESSAGE TO CHAT
  // Used by ChatWindow if it sends directly with a chat ID
  // ============================================================

  const sendMessageToChat = async (chatId, currentPrompt) => {
    if (!currentPrompt?.trim() || loading) {
      return;
    }

    const prompt = currentPrompt.trim();

    // ========================================================
    // GUEST
    // IMPORTANT:
    // Guest does NOT require a MongoDB chat ID.
    // ========================================================

    if (isGuest) {
      // Check guest limit first
      if (guestMessageCount >= FREE_MESSAGE_LIMIT) {
        setShowLoginModal(true);
        return;
      }

      // Create local guest chat if necessary
      let activeChatId = chatId;

      if (!activeChatId) {
        activeChatId = Date.now();

        const newGuestChat = {
          id: activeChatId,
          title: prompt.length > 30 ? prompt.slice(0, 30) + "..." : prompt,
          messages: [],
        };

        setChats((prev) => [newGuestChat, ...prev]);

        setCurrentChatId(activeChatId);
      }

      // Add user + thinking
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
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
        const reply = await sendGuestPrompt(prompt, uploadedDocument);

        // Remove thinking
        setMessages((prev) => prev.slice(0, -1));

        // Increase guest count
        const count = guestMessageCount + 1;

        setGuestMessageCount(count);

        localStorage.setItem("guest_message_count", count.toString());

        // Animate reply
        await animateResponse(reply);
      } catch (error) {
        console.error("Guest message error:", error);

        setMessages((prev) => {
          const updated = prev.slice(0, -1);

          updated.push({
            role: "assistant",
            content:
              error.response?.data?.message ||
              "Something went wrong. Please try again.",
          });

          return updated;
        });
      } finally {
        setLoading(false);
      }

      return;
    }

    // ========================================================
    // LOGGED-IN USER
    // ========================================================

    if (!chatId) {
      console.error("No chat ID available for logged-in user.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: prompt,
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
      const data = await sendPrompt(chatId, prompt, uploadedDocument, token);

      // Remove thinking
      setMessages((prev) => prev.slice(0, -1));

      // Update chat in sidebar
      if (data.chat) {
        setChats((prev) =>
          prev.map((chat) => (chat._id === chatId ? data.chat : chat)),
        );
      }

      // Animate AI response
      await animateResponse(data.reply);
    } catch (error) {
      console.error("Send message error:", error);

      setMessages((prev) => {
        const updated = prev.slice(0, -1);

        updated.push({
          role: "assistant",
          content:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        });

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // DELETE CHAT
  // ============================================================

  const deleteChat = async (chatId) => {
    // ========================================================
    // GUEST
    // ========================================================

    if (isGuest) {
      const updatedChats = chats.filter((chat) => chat.id !== chatId);

      setChats(updatedChats);

      if (currentChatId === chatId) {
        if (updatedChats.length > 0) {
          setCurrentChatId(updatedChats[0].id);

          setMessages(updatedChats[0].messages || []);
        } else {
          setCurrentChatId(null);
          setMessages([]);
        }
      }

      return;
    }

    // ========================================================
    // LOGGED-IN USER
    // ========================================================

    try {
      await deleteChatAPI(chatId, token);

      const updatedChats = chats.filter((chat) => chat._id !== chatId);

      setChats(updatedChats);

      if (currentChatId === chatId) {
        setCurrentChatId(null);
        setMessages([]);

        setUploadedDocument(null);
        setUploadedImage(null);
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  // ============================================================
  // RENAME CHAT
  // ============================================================

  const renameChat = async (chatId, newTitle) => {
    if (!newTitle || !newTitle.trim()) {
      return;
    }

    // ========================================================
    // GUEST
    // ========================================================

    if (isGuest) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                title: newTitle.trim(),
              }
            : chat,
        ),
      );

      return;
    }

    // ========================================================
    // LOGGED-IN USER
    // ========================================================

    try {
      const updatedChat = await renameChatAPI(chatId, newTitle.trim(), token);

      setChats((prev) =>
        prev.map((chat) => (chat._id === chatId ? updatedChat : chat)),
      );
    } catch (error) {
      console.error("Failed to rename chat:", error);
    }
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredChats = chats.filter((chat) => {
    const title = chat.title || "New Chat";

    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <ChatContext.Provider
      value={{
        // Messages
        messages,
        setMessages,

        // Chats
        chats,
        setChats,
        filteredChats,

        // Current chat
        currentChatId,
        setCurrentChatId,

        // Input
        input,
        setInput,

        // Loading
        loading,

        // Creating chat
        creatingChat,

        // Search
        searchQuery,
        setSearchQuery,

        // Actions
        sendMessage,
        sendMessageToChat,
        newChat,
        openChat,

        deleteChat,
        renameChat,

        // Login modal
        showLoginModal,
        setShowLoginModal,

        // Guest
        guestMessageCount,
        FREE_MESSAGE_LIMIT,
        isGuest,

        // Uploads
        uploadedDocument,
        setUploadedDocument,

        uploadedImage,
        setUploadedImage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
