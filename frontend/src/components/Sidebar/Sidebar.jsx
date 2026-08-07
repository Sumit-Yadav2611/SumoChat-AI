import { useState, useContext } from "react";
import {
  MdMenu,
  MdAdd,
  MdSettings,
  MdHistory,
  MdHelpOutline,
} from "react-icons/md";

import { ChatContext } from "../../context/ChatContext";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    newChat,
    openChat,
    currentChatId,

    filteredChats,

    deleteChat,
    renameChat,

    searchQuery,
    setSearchQuery,
  } = useContext(ChatContext);

  return (
    <div
      className={`
        h-screen
        bg-[#1e1f20]
        text-white
        border-r
        border-[#303030]
        flex
        flex-col
        transition-all
        duration-300
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* ================= HEADER ================= */}

      <div className="p-4 flex-shrink-0">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-2xl p-2 rounded-full hover:bg-[#2d2e30] transition"
        >
          <MdMenu />
        </button>

        <button
          onClick={newChat}
          className={`mt-8 flex items-center rounded-full bg-[#2d2e30] hover:bg-[#3b3c3d] transition ${
            collapsed
              ? "justify-center w-12 h-12 mx-auto"
              : "gap-3 px-4 py-3 w-full"
          }`}
        >
          <MdAdd size={22} />

          {!collapsed && <span className="text-lg">New Chat</span>}
        </button>

        {!collapsed && (
          <>
            <h3 className="text-gray-400 mt-8 mb-3 text-sm">
              Recent
            </h3>

            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-[#2d2e30] px-3 py-2 text-sm outline-none"
            />
          </>
        )}
      </div>

      {/* ================= CHAT LIST ================= */}

      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-4 pb-4">

          <div className="space-y-2 mt-3">

            {filteredChats.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No recent chats
              </p>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => openChat(chat.id)}
                  className={`group flex items-center justify-between rounded-lg px-4 py-3 cursor-pointer transition ${
                    currentChatId === chat.id
                      ? "bg-[#3c4043]"
                      : "hover:bg-[#2d2e30]"
                  }`}
                >
                  <span className="truncate flex-1">
                    {chat.title}
                  </span>

                  <div className="hidden group-hover:flex gap-2">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        const title = prompt(
                          "Rename Chat",
                          chat.title
                        );

                        if (title) {
                          renameChat(chat.id, title);
                        }
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        if (
                          window.confirm(
                            "Delete this chat?"
                          )
                        ) {
                          deleteChat(chat.id);
                        }
                      }}
                    >
                      🗑️
                    </button>

                  </div>
                </div>
              ))
            )}

          </div>

        </div>
      )}

      {/* ================= FOOTER ================= */}

      <div className="border-t border-[#303030] p-4 flex-shrink-0">

        <button
          className={`flex items-center rounded-lg hover:bg-[#2d2e30] transition ${
            collapsed
              ? "justify-center p-3"
              : "gap-3 p-3 w-full"
          }`}
        >
          <MdSettings size={22} />
          {!collapsed && <span>Settings</span>}
        </button>

        <button
          className={`flex items-center rounded-lg hover:bg-[#2d2e30] transition ${
            collapsed
              ? "justify-center p-3"
              : "gap-3 p-3 w-full"
          }`}
        >
          <MdHelpOutline size={22} />
          {!collapsed && <span>Help</span>}
        </button>

        <button
          className={`flex items-center rounded-lg hover:bg-[#2d2e30] transition ${
            collapsed
              ? "justify-center p-3"
              : "gap-3 p-3 w-full"
          }`}
        >
          <MdHistory size={22} />
          {!collapsed && <span>Activity</span>}
        </button>

      </div>
    </div>
  );
}

export default Sidebar;