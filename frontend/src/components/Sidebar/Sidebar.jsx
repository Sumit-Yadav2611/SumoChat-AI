import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  MdMenu,
  MdAdd,
  MdSearch,
  MdSettings,
  MdHistory,
  MdHelpOutline,
  MdEdit,
  MdDeleteOutline,
  MdKeyboardArrowRight,
} from "react-icons/md";

import { ChatContext } from "../../context/ChatContext";

function Sidebar() {
  const navigate = useNavigate();

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
    creatingChat,
  } = useContext(ChatContext);

  // ============================================================
  // GET CHAT ID
  // ============================================================

  const getChatId = (chat) => {
    return chat._id || chat.id;
  };

  // ============================================================
  // NEW CHAT
  // ============================================================

  const handleNewChat = () => {
    if (creatingChat) return;

    newChat();
  };

  // ============================================================
  // RENAME
  // ============================================================

  const handleRename = (e, chat) => {
    e.stopPropagation();

    const currentTitle = chat.title || "New Chat";

    const newTitle = window.prompt("Rename chat", currentTitle);

    if (!newTitle || !newTitle.trim()) {
      return;
    }

    renameChat(getChatId(chat), newTitle.trim());
  };

  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = (e, chat) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this chat?",
    );

    if (!confirmed) return;

    deleteChat(getChatId(chat));
  };

  return (
    <aside
      className={`
        relative
        flex
        h-screen
        flex-shrink-0
        flex-col
        overflow-hidden
        border-r
        border-white/[0.06]
        bg-[#090d16]
        text-white
        transition-all
        duration-300
        ease-in-out

        ${collapsed ? "w-[76px]" : "w-[292px]"}
      `}
    >
      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-blue-500/[0.06]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -right-32
          h-72
          w-72
          rounded-full
          bg-purple-500/[0.04]
          blur-3xl
        "
      />

      {/* ======================================================
          TOP SECTION
      ====================================================== */}

      <div className="relative z-10 px-3 pt-4">
        {/* ----------------------------------------------------
            TOP BAR
        ---------------------------------------------------- */}

        <div
          className={`
            flex
            items-center
            ${collapsed ? "justify-center" : "justify-between"}
          `}
        >
          {/* Menu Button */}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.035]
              text-slate-400
              transition-all
              duration-200
              hover:border-white/[0.12]
              hover:bg-white/[0.07]
              hover:text-white
            "
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <MdMenu size={21} />
          </button>

          {/* Logo / Brand */}
          {!collapsed && (
            <div
              className="
                flex
                items-center
                gap-2.5
                px-2
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-500
                  via-indigo-500
                  to-purple-500
                  shadow-lg
                  shadow-blue-500/20
                "
              >
                <span className="text-sm font-bold">S</span>
              </div>

              <span
                className="
                  text-[15px]
                  font-semibold
                  tracking-tight
                  text-white
                "
              >
                SumoChat
              </span>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------
            NEW CHAT
        ---------------------------------------------------- */}

        <button
          onClick={handleNewChat}
          disabled={creatingChat}
          className={`
            group
            mt-7
            flex
            items-center
            overflow-hidden
            rounded-2xl
            border
            border-blue-400/[0.12]
            bg-gradient-to-r
            from-blue-500/[0.12]
            to-indigo-500/[0.08]
            text-slate-200
            shadow-lg
            shadow-blue-950/10
            transition-all
            duration-300

            hover:border-blue-400/[0.28]
            hover:from-blue-500/[0.18]
            hover:to-indigo-500/[0.14]
            hover:shadow-blue-500/[0.08]

            disabled:cursor-not-allowed
            disabled:opacity-50

            ${
              collapsed
                ? "mx-auto h-12 w-12 justify-center"
                : "w-full gap-3 px-4 py-3.5"
            }
          `}
        >
          <span
            className="
              flex
              h-8
              w-8
              flex-shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-500/[0.15]
              text-blue-300
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <MdAdd size={21} />
          </span>

          {!collapsed && (
            <div className="flex flex-1 items-center justify-between">
              <span className="text-sm font-medium">
                {creatingChat ? "Creating..." : "New chat"}
              </span>

              {!creatingChat && (
                <span
                  className="
                    text-xs
                    text-slate-500
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                >
                  Ctrl K
                </span>
              )}
            </div>
          )}
        </button>

        {/* ----------------------------------------------------
            SEARCH
        ---------------------------------------------------- */}

        {!collapsed && (
          <div className="mt-5">
            <div
              className="
                group
                flex
                items-center
                gap-2.5
                rounded-xl
                border
                border-white/[0.055]
                bg-white/[0.025]
                px-3.5
                transition-all
                duration-200
                focus-within:border-blue-400/20
                focus-within:bg-white/[0.045]
              "
            >
              <MdSearch
                size={19}
                className="
                  flex-shrink-0
                  text-slate-500
                  transition-colors
                  group-focus-within:text-blue-400
                "
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats..."
                className="
                  h-11
                  min-w-0
                  flex-1
                  bg-transparent
                  text-sm
                  text-slate-200
                  outline-none
                  placeholder:text-slate-600
                "
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="
                    text-xs
                    text-slate-500
                    hover:text-white
                  "
                >
                  ESC
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================
          CHAT HISTORY
      ====================================================== */}

      {!collapsed && (
        <div className="relative z-10 mt-6 flex-1 overflow-y-auto px-3 pb-4">
          {/* Section Heading */}

          <div className="mb-2 flex items-center justify-between px-2">
            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-600
              "
            >
              Recent chats
            </span>

            {filteredChats.length > 0 && (
              <span
                className="
                  rounded-full
                  bg-white/[0.04]
                  px-2
                  py-0.5
                  text-[10px]
                  text-slate-600
                "
              >
                {filteredChats.length}
              </span>
            )}
          </div>

          {/* Chat List */}

          <div className="space-y-1">
            {filteredChats.length === 0 ? (
              <div
                className="
                  mt-8
                  flex
                  flex-col
                  items-center
                  px-5
                  text-center
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    text-lg
                    text-slate-600
                  "
                >
                  ✨
                </div>

                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  No conversations yet
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-relaxed
                    text-slate-700
                  "
                >
                  Start a new chat to begin your conversation.
                </p>
              </div>
            ) : (
              filteredChats.map((chat) => {
                const chatId = getChatId(chat);

                const isActive = currentChatId === chatId;

                return (
                  <div
                    key={chatId}
                    onClick={() => openChat(chatId)}
                    className={`
                      group
                      relative
                      flex
                      min-h-[48px]
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? `
                            border
                            border-blue-400/[0.12]
                            bg-blue-500/[0.08]
                          `
                          : `
                            border
                            border-transparent
                            hover:border-white/[0.045]
                            hover:bg-white/[0.035]
                          `
                      }
                    `}
                  >
                    {/* Active indicator */}

                    {isActive && (
                      <div
                        className="
                          absolute
                          left-0
                          top-1/2
                          h-6
                          w-0.5
                          -translate-y-1/2
                          rounded-full
                          bg-gradient-to-b
                          from-blue-400
                          to-purple-400
                          shadow-lg
                          shadow-blue-500/30
                        "
                      />
                    )}

                    {/* Chat Icon */}

                    <div
                      className={`
                        flex
                        h-8
                        w-8
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-xs
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? "bg-blue-500/[0.13] text-blue-300"
                            : "bg-white/[0.035] text-slate-600 group-hover:bg-white/[0.06] group-hover:text-slate-400"
                        }
                      `}
                    >
                      ✦
                    </div>

                    {/* Title */}

                    <div className="min-w-0 flex-1">
                      <p
                        className={`
                          truncate
                          text-[13px]
                          font-medium
                          transition-colors

                          ${
                            isActive
                              ? "text-slate-200"
                              : "text-slate-400 group-hover:text-slate-200"
                          }
                        `}
                      >
                        {chat.title || "New Chat"}
                      </p>
                    </div>

                    {/* Actions */}

                    <div
                      className="
                        flex
                        translate-x-1
                        items-center
                        gap-0.5
                        opacity-0
                        transition-all
                        duration-200
                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    >
                      {/* Rename */}

                      <button
                        onClick={(e) => handleRename(e, chat)}
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-600
                          transition
                          hover:bg-white/[0.07]
                          hover:text-blue-300
                        "
                        title="Rename chat"
                      >
                        <MdEdit size={16} />
                      </button>

                      {/* Delete */}

                      <button
                        onClick={(e) => handleDelete(e, chat)}
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-600
                          transition
                          hover:bg-red-500/[0.08]
                          hover:text-red-400
                        "
                        title="Delete chat"
                      >
                        <MdDeleteOutline size={17} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ======================================================
          COLLAPSED CHAT INDICATOR
      ====================================================== */}

      {collapsed && (
        <div className="relative z-10 flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-2">
            {filteredChats.map((chat) => {
              const chatId = getChatId(chat);

              const isActive = currentChatId === chatId;

              return (
                <button
                  key={chatId}
                  onClick={() => openChat(chatId)}
                  className={`
                    relative
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    transition-all

                    ${
                      isActive
                        ? "bg-blue-500/[0.12] text-blue-300"
                        : "text-slate-600 hover:bg-white/[0.05] hover:text-slate-300"
                    }
                  `}
                  title={chat.title || "New Chat"}
                >
                  ✦
                  {isActive && (
                    <span
                      className="
                        absolute
                        left-0
                        h-5
                        w-0.5
                        rounded-full
                        bg-blue-400
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          border-t
          border-white/[0.055]
          p-3
        "
      >
        {/* Settings */}

        <button
          onClick={() => navigate("/settings")}
          className={`
            group
            flex
            w-full
            items-center
            rounded-xl
            text-slate-500
            transition-all
            duration-200
            hover:bg-white/[0.04]
            hover:text-slate-200

            ${collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5"}
          `}
        >
          <MdSettings
            size={19}
            className="
              transition-transform
              duration-300
              group-hover:rotate-45
            "
          />

          {!collapsed && (
            <>
              <span className="flex-1 text-left text-[13px]">Settings</span>

              <MdKeyboardArrowRight
                size={17}
                className="
                  text-slate-700
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </>
          )}
        </button>

        {/* Help */}

        <button
          onClick={() => navigate("/help")}
          className={`
            group
            flex
            w-full
            items-center
            rounded-xl
            text-slate-500
            transition-all
            duration-200
            hover:bg-white/[0.04]
            hover:text-slate-200

            ${collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5"}
          `}
        >
          <MdHelpOutline size={19} />

          {!collapsed && (
            <>
              <span className="flex-1 text-left text-[13px]">Help</span>

              <MdKeyboardArrowRight
                size={17}
                className="
                  text-slate-700
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </>
          )}
        </button>

        {/* Activity */}

        <button
          onClick={() => navigate("/activity")}
          className={`
            group
            flex
            w-full
            items-center
            rounded-xl
            text-slate-500
            transition-all
            duration-200
            hover:bg-white/[0.04]
            hover:text-slate-200

            ${collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5"}
          `}
        >
          <MdHistory size={19} />

          {!collapsed && (
            <>
              <span className="flex-1 text-left text-[13px]">Activity</span>

              <MdKeyboardArrowRight
                size={17}
                className="
                  text-slate-700
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
