import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FaRobot,
  FaCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaVolumeUp,
  FaCheck,
  FaDownload,
  FaExpand,
  FaTimes,
} from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
function Message({ message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  // ==========================================
  // GENERATED IMAGE STATE
  // ==========================================

  const [showImageViewer, setShowImageViewer] = useState(false);

  const isImage = message.type === "image" || message.messageType === "image";

  const imageMimeType = message.mimeType || message.mime_type || "image/jpeg";

  const imageSource = message.image || message.content || "";

  const imageSrc = imageSource
    ? imageSource.startsWith("data:")
      ? imageSource
      : `data:${imageMimeType};base64,${imageSource}`
    : null;

  // ==========================================
  // DOWNLOAD GENERATED IMAGE
  // ==========================================
  const handleDownloadImage = () => {
    if (!imageSrc) return;

    const link = document.createElement("a");

    link.href = imageSrc;
    link.download = `sumochat-ai-${Date.now()}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // COPY IMAGE PROMPT
  // ==========================================
  const handleCopyPrompt = async () => {
    if (!message.prompt) return;

    try {
      await navigator.clipboard.writeText(message.prompt);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy prompt failed:", error);
    }
  };
  
  // ==========================================
  // COPY RESPONSE
  // ==========================================
  const handleCopy = async () => {
    if (!message.content) return;
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
  // ==========================================
  // SPEAK RESPONSE
  // ==========================================
  const handleSpeak = () => {
    if (!message.content) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(message.content);
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };
  // ==========================================
  // THINKING STATE
  // ==========================================
  if (message.loading) {
    return (
      <div className="w-full flex justify-start my-6">
        <div className="flex items-start gap-4 max-w-4xl">
          {/* AI Avatar */}
          <div
            className="
              flex-shrink-0
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-blue-500
              to-purple-600
              shadow-[0_0_20px_rgba(99,102,241,0.35)]
            "
          >
            <FaRobot className="text-white" size={19} />
          </div>
          {/* Thinking */}
          <div
            className="
              flex
              items-center
              gap-4
              px-5
              py-4
              rounded-2xl
              border
              border-blue-500/20
              bg-[#0d1424]/80
              backdrop-blur-xl
              shadow-[0_0_25px_rgba(59,130,246,0.08)]
            "
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-blue-400
                    animate-bounce
                  "
                  style={{
                    animationDelay: `${item * 150}ms`,
                  }}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">thinking...</span>
          </div>
        </div>
      </div>
    );
  }
  // ==========================================
  // USER MESSAGE
  // ==========================================
  if (isUser) {
    return (
      <div
        className={`w-full flex ${
          isUser ? "justify-end" : "justify-start"
        } my-5`}
      >
        <div
          className={`
      max-w-[75%]
      rounded-2xl
      px-5
      py-3
      text-[15px]
      leading-7
      transition-all
      duration-300

      ${
        isUser
          ? `
            bg-[#151c2b]
            border
            border-blue-400/10
            text-slate-100
            shadow-[0_8px_30px_rgba(0,0,0,0.18)]
            hover:border-blue-400/20
            hover:bg-[#192235]
          `
          : `
            bg-transparent
            text-gray-100
          `
      }
    `}
        >
          {message.content}
        </div>
      </div>
    );
  }
  // ==========================================
  // AI RESPONSE
  // ==========================================
  return (
    <div className="w-full flex justify-start my-7 px-2">
      <div className="flex items-start gap-4 max-w-5xl w-full">
        {/* =====================================
            AI AVATAR
        ===================================== */}
        <div
          className="
            flex-shrink-0
            w-10
            h-10
            rounded-xl
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-cyan-500
            via-blue-500
            to-purple-600
            shadow-[0_0_25px_rgba(59,130,246,0.35)]
            border
            border-blue-300/20
          "
        >
          <FaRobot size={19} className="text-white" />
        </div>
        {/* =====================================
            RESPONSE CONTENT
        ===================================== */}
        <div className="flex-1 min-w-0">
          {/* AI NAME */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="
                font-semibold
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-blue-400
                to-purple-400
              "
            >
              SumoChat AI
            </span>

            <span
              className="
                text-[10px]
                px-2
                py-0.5
                rounded-full
                bg-blue-500/10
                text-blue-400
                border
                border-blue-500/20
              "
            >
              AI
            </span>
          </div>
          {/* RESPONSE CARD */}
          <div
            className="
              relative
              rounded-2xl
              border
              border-[#1d3157]
              bg-gradient-to-br
              from-[#0d1424]
              via-[#0b1220]
              to-[#101025]
              px-6
              py-5
              shadow-[0_10px_40px_rgba(15,23,42,0.35)]
              overflow-hidden
            "
          >
            {/* Neon glow */}
            <div
              className="
                absolute
                -top-20
                -left-20
                w-40
                h-40
                rounded-full
                bg-blue-500/10
                blur-3xl
                pointer-events-none
              "
            />
            <div
              className="
                absolute
                -bottom-20
                -right-20
                w-40
                h-40
                rounded-full
                bg-purple-500/10
                blur-3xl
                pointer-events-none
              "
            />
            {/* Small AI sparkle */}
            <div
              className="
                absolute
                top-4
                right-5
                text-blue-400/50
                text-xs
              "
            >
              ✦
            </div>
            {/* =================================
    GENERATED IMAGE
================================= */}

{isImage && imageSrc ? (
  <>
    <div
      className="
        relative
        z-10
        w-full
        max-w-2xl
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#0b1220]
        shadow-[0_15px_50px_rgba(0,0,0,0.35)]
      "
    >
      {/* IMAGE */}

      <button
        type="button"
        onClick={() =>
          setShowImageViewer(true)
        }
        className="
          group
          relative
          block
          w-full
          cursor-zoom-in
          overflow-hidden
        "
      >
        <img
          src={imageSrc}
          alt={
            message.prompt ||
            "Generated by SumoChat AI"
          }
          className="
            block
            w-full
            max-h-[650px]
            object-contain
            bg-[#080d18]
            transition-transform
            duration-500
            group-hover:scale-[1.015]
          "
        />

        {/* Expand overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/0
            transition
            duration-300
            group-hover:bg-black/20
          "
        >
          <div
            className="
              rounded-full
              bg-black/60
              p-3
              text-white
              opacity-0
              transition
              duration-300
              group-hover:opacity-100
            "
          >
            <FaExpand size={16} />
          </div>
        </div>
      </button>

      {/* IMAGE FOOTER */}

      <div
        className="
          border-t
          border-white/10
          bg-[#0b1220]
          px-4
          py-3
        "
      >
        {/* Branding */}

        <div
          className="
            mb-3
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-lg
              bg-gradient-to-br
              from-blue-500
              to-purple-600
            "
          >
            <FaRobot
              className="text-white"
              size={12}
            />
          </div>

          <span
            className="
              text-xs
              font-medium
              text-slate-400
            "
          >
            Generated by SumoChat AI
          </span>
        </div>

        {/* Prompt */}

        {message.prompt && (
          <p
            className="
              mb-3
              line-clamp-2
              text-sm
              leading-6
              text-slate-300
            "
          >
            {message.prompt}
          </p>
        )}

        {/* ACTIONS */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          {/* Download */}

          <button
            type="button"
            onClick={handleDownloadImage}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-white/10
              bg-white/[0.04]
              px-3
              py-2
              text-xs
              text-slate-300
              transition
              hover:border-blue-400/30
              hover:bg-blue-500/10
              hover:text-blue-300
            "
          >
            <FaDownload size={12} />
            Download
          </button>

          {/* Expand */}

          <button
            type="button"
            onClick={() =>
              setShowImageViewer(true)
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-white/10
              bg-white/[0.04]
              px-3
              py-2
              text-xs
              text-slate-300
              transition
              hover:border-purple-400/30
              hover:bg-purple-500/10
              hover:text-purple-300
            "
          >
            <FaExpand size={12} />
            View
          </button>

          {/* Copy Prompt */}

          {message.prompt && (
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-white/10
                bg-white/[0.04]
                px-3
                py-2
                text-xs
                text-slate-300
                transition
                hover:border-emerald-400/30
                hover:bg-emerald-500/10
                hover:text-emerald-300
              "
            >
              {copied ? (
                <FaCheck size={12} />
              ) : (
                <FaCopy size={12} />
              )}

              {copied
                ? "Copied"
                : "Copy Prompt"}
            </button>
          )}
        </div>
      </div>
    </div>

    {/* ==========================================
        FULL SCREEN IMAGE VIEWER
    ========================================== */}

    {showImageViewer && (
      <div
        className="
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          bg-black/90
          p-4
          backdrop-blur-md
        "
        onClick={() =>
          setShowImageViewer(false)
        }
      >
        {/* Close */}

        <button
          type="button"
          onClick={() =>
            setShowImageViewer(false)
          }
          className="
            absolute
            right-5
            top-5
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/10
            text-white
            transition
            hover:bg-white/20
          "
        >
          <FaTimes />
        </button>

        {/* Full Image */}

        <img
          src={imageSrc}
          alt={
            message.prompt ||
            "Generated by SumoChat AI"
          }
          onClick={(e) =>
            e.stopPropagation()
          }
          className="
            max-h-[92vh]
            max-w-[95vw]
            rounded-xl
            object-contain
            shadow-[0_20px_80px_rgba(0,0,0,0.6)]
          "
        />
      </div>
    )}
  </>
) : null}

            {/* ==========
              MARKDOWN    */}

            {!isImage && (
              <div className="relative z-10">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // -----------------------------
                    // H1
                    // -----------------------------
                    h1: ({ children }) => (
                      <h1
                        className="
                         text-3xl
                         font-bold
                         mt-2
                         mb-5
                         text-white
                       "
                      >
                        {children}
                      </h1>
                    ),

                    // -----------------------------
                    // H2
                    // -----------------------------
                    h2: ({ children }) => (
                      <h2
                        className="
              text-2xl
              font-semibold
              mt-7
              mb-4
              text-white
            "
                      >
                        {children}
                      </h2>
                    ),

                    // -----------------------------
                    // H3
                    // -----------------------------
                    h3: ({ children }) => (
                      <h3
                        className="
              text-xl
              font-semibold
              mt-6
              mb-3
              text-blue-200
            "
                      >
                        {children}
                      </h3>
                    ),

                    // -----------------------------
                    // PARAGRAPH
                    // -----------------------------
                    p: ({ children }) => (
                      <p
                        className="
              leading-8
              text-[16px]
              text-gray-200
              mb-4
            "
                      >
                        {children}
                      </p>
                    ),

                    // -----------------------------
                    // BOLD
                    // -----------------------------
                    strong: ({ children }) => (
                      <strong
                        className="
              font-semibold
              text-white
            "
                      >
                        {children}
                      </strong>
                    ),

                    // -----------------------------
                    // LIST
                    // -----------------------------
                    ul: ({ children }) => (
                      <ul
                        className="
              my-4
              space-y-2
              pl-6
              list-disc
              text-gray-200
            "
                      >
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol
                        className="
              my-4
              space-y-2
              pl-6
              list-decimal
              text-gray-200
            "
                      >
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li
                        className="
              pl-1
              leading-7
            "
                      >
                        {children}
                      </li>
                    ),

                    // -----------------------------
                    // LINKS
                    // -----------------------------
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              text-blue-400
              hover:text-purple-400
              underline
              underline-offset-2
              transition
            "
                      >
                        {children}
                      </a>
                    ),

                    // -----------------------------
                    // BLOCKQUOTE
                    // -----------------------------
                    blockquote: ({ children }) => (
                      <blockquote
                        className="
              border-l-4
              border-blue-500
              pl-4
              my-5
              text-gray-400
              italic
              bg-blue-500/5
              py-3
              rounded-r-lg
            "
                      >
                        {children}
                      </blockquote>
                    ),

                    // -----------------------------
                    // TABLE
                    // -----------------------------
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table
                          className="
                w-full
                border-collapse
                overflow-hidden
                rounded-xl
                border
                border-[#263552]
                text-sm
              "
                        >
                          {children}
                        </table>
                      </div>
                    ),

                    // -----------------------------
                    // TABLE HEADER
                    // -----------------------------
                    th: ({ children }) => (
                      <th
                        className="
              border
              border-[#263552]
              px-4
              py-3
              text-left
              font-semibold
              text-blue-200
              bg-[#111b31]
            "
                      >
                        {children}
                      </th>
                    ),

                    // -----------------------------
                    // TABLE CELL
                    // -----------------------------
                    td: ({ children }) => (
                      <td
                        className="
              border
              border-[#263552]
              px-4
              py-3
              text-gray-200
              bg-[#0d1424]
            "
                      >
                        {children}
                      </td>
                    ),

                    // -----------------------------
                    // CODE
                    // -----------------------------
                    code({ inline, className, children }) {
                      const match = /language-(\w+)/.exec(className || "");

                      return !inline && match ? (
                        <div className="my-5">
                          <SyntaxHighlighter
                            language={match[1]}
                            style={oneDark}
                            customStyle={{
                              borderRadius: "14px",
                              padding: "20px",
                              margin: 0,
                              background: "#080d18",
                              border: "1px solid #1d3157",
                              fontSize: "14px",
                            }}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code
                          className="
                bg-blue-500/10
                text-blue-300
                border
                border-blue-500/20
                px-1.5
                py-0.5
                rounded-md
                text-sm
              "
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            )}
            {/* =================================
                ACTION BAR
            ================================= */}
            <div
              className="
                relative
                z-10
                flex
                items-center
                gap-1
                mt-5
                pt-3
                border-t
                border-white/5
              "
            >
              {/* Copy */}
              <button
                onClick={handleCopy}
                title="Copy response"
                className="
                  flex
                  items-center
                  justify-center
                  w-9
                  h-9
                  rounded-lg
                  text-gray-500

                  hover:text-blue-400
                  hover:bg-blue-500/10

                  transition
                "
              >
                {copied ? (
                  <FaCheck size={13} className="text-green-400" />
                ) : (
                  <FaCopy size={13} />
                )}
              </button>
              {/* Like */}
              <button
                title="Good response"
                className="
                  w-9
                  h-9
                  rounded-lg

                  flex
                  items-center
                  justify-center

                  text-gray-500

                  hover:text-blue-400
                  hover:bg-blue-500/10

                  transition
                "
              >
                <FaThumbsUp size={13} />
              </button>

              {/* Dislike */}

              <button
                title="Bad response"
                className="
                  w-9
                  h-9
                  rounded-lg

                  flex
                  items-center
                  justify-center

                  text-gray-500

                  hover:text-red-400
                  hover:bg-red-500/10

                  transition
                "
              >
                <FaThumbsDown size={13} />
              </button>

              {/* Speak */}

              <button
                onClick={handleSpeak}
                title="Read aloud"
                className="
                  w-9
                  h-9
                  rounded-lg

                  flex
                  items-center
                  justify-center

                  text-gray-500

                  hover:text-purple-400
                  hover:bg-purple-500/10

                  transition
                "
              >
                <FaVolumeUp size={13} />
              </button>

              {/* AI status */}

              <div className="ml-auto flex items-center gap-2">
                <span
                  className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-green-400
                    shadow-[0_0_8px_rgba(74,222,128,0.8)]
                  "
                />

                <span
                  className="
                    text-[11px]
                    text-gray-500
                  "
                >
                  SumoChat AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
