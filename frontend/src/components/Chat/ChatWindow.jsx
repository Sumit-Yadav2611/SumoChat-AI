import useChat from "../../hooks/useChat";
import Message from "./Message";
import { useAuth } from "../../context/AuthContext";

const cards = [
  {
    title: "Brainstorm ideas",
    icon: "✨",
    description: "Generate creative ideas and explore possibilities",
    prompt:
      "Help me brainstorm some creative and unique ideas. Give me several useful ideas and explain each one briefly.",
    accent: "blue",
  },
  {
    title: "Explain a topic",
    icon: "📖",
    description: "Understand complex topics in simple language",
    prompt:
      "Explain this topic to me in simple language. Break it down step by step and include easy examples.",
    accent: "purple",
  },
  {
    title: "Help with coding",
    icon: "💻",
    description: "Build, debug, and improve your code",
    prompt:
      "Help me with my coding problem. Give me a clean solution, explain the logic step by step, and mention common mistakes.",
    accent: "cyan",
  },
  {
    title: "Improve writing",
    icon: "✍️",
    description: "Rewrite, polish, and improve your writing",
    prompt:
      "Improve my writing while keeping the original meaning. Make it clearer, more natural, professional, and grammatically correct.",
    accent: "pink",
  },
];

function ChatWindow() {
  const { messages, setInput } = useChat();
  const { user, token } = useAuth();

  // =========================
  // Greeting
  // =========================

  const isGuest = !user || !token;

  const firstName = user?.name?.trim().split(/\s+/)[0];

  const greeting = isGuest
    ? "Hello 👋"
    : `Hello, ${firstName || "there"}.`;

  // =========================
  // Card Click
  // =========================

  const handleCardClick = (prompt) => {
    setInput(prompt);

    // Focus the main chat input
    setTimeout(() => {
      const input = document.querySelector(
        'input[placeholder="Ask SumoChat AI..."]'
      );

      if (input) {
        input.focus();

        // Put cursor at the end
        input.setSelectionRange(
          input.value.length,
          input.value.length
        );
      }
    }, 50);
  };

  // =========================
  // Welcome Screen
  // =========================

  if (messages.length === 0) {
    return (
      <div
        className="
          relative
          flex
          h-full
          w-full
          flex-col
          items-center
          overflow-y-auto
          overflow-x-hidden
          bg-[#050816]
          px-4
          py-8
          sm:px-6
        "
      >
        {/* =====================================================
            AMBIENT BACKGROUND
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Main radial glow */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.10),transparent_40%)]
            "
          />

          {/* Blue glow */}
          <div
            className="
              absolute
              -left-40
              -top-40
              h-[500px]
              w-[500px]
              rounded-full
              bg-blue-600/[0.08]
              blur-[150px]
            "
          />

          {/* Purple glow */}
          <div
            className="
              absolute
              -right-40
              top-10
              h-[550px]
              w-[550px]
              rounded-full
              bg-purple-600/[0.08]
              blur-[160px]
            "
          />

          {/* Cyan glow */}
          <div
            className="
              absolute
              left-1/2
              top-[30%]
              h-[450px]
              w-[450px]
              -translate-x-1/2
              rounded-full
              bg-cyan-500/[0.035]
              blur-[160px]
            "
          />

          {/* Bottom purple glow */}
          <div
            className="
              absolute
              -bottom-56
              right-[15%]
              h-[500px]
              w-[500px]
              rounded-full
              bg-purple-500/[0.05]
              blur-[160px]
            "
          />

          {/* Bottom blue glow */}
          <div
            className="
              absolute
              -bottom-64
              left-[10%]
              h-[500px]
              w-[500px]
              rounded-full
              bg-blue-500/[0.045]
              blur-[160px]
            "
          />

          {/* Subtle grid */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.018]
              bg-[linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)]
              bg-[size:64px_64px]
            "
          />

          {/* Top fade */}
          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-40
              bg-gradient-to-b
              from-[#050816]
              via-[#050816]/70
              to-transparent
            "
          />

          {/* Bottom fade */}
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              h-32
              bg-gradient-to-t
              from-[#050816]
              to-transparent
            "
          />
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div
          className="
            relative
            z-10
            flex
            w-full
            max-w-5xl
            flex-col
            items-center
          "
        >
          {/* =================================================
              AI BADGE
          ================================================== */}

          <div
            className="
              mb-6
              flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-[#0b1220]/70
              px-4
              py-2
              text-sm
              text-blue-300
              shadow-[0_0_30px_rgba(59,130,246,0.08)]
              backdrop-blur-xl
            "
          >
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-cyan-400
                shadow-[0_0_12px_rgba(34,211,238,0.9)]
              "
            />

            <span>Powered by Gemini AI</span>
          </div>

          {/* =================================================
              WELCOME HEADING
          ================================================== */}

          <div className="text-center">
            <h1
              className="
                bg-gradient-to-r
                from-blue-400
                via-purple-400
                to-pink-500
                bg-clip-text
                text-5xl
                font-bold
                tracking-tight
                text-transparent
                drop-shadow-[0_0_30px_rgba(99,102,241,0.18)]
                sm:text-6xl
              "
            >
              {greeting}
            </h1>

            <p
              className="
                mt-4
                text-2xl
                font-light
                tracking-tight
                text-slate-400
                sm:text-3xl
              "
            >
              How can I help you today?
            </p>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-relaxed
                text-slate-500
              "
            >
              Ask questions, analyze images, understand PDFs, write
              code, or explore new ideas with SumoChat AI.
            </p>
          </div>

          {/* =================================================
              SUGGESTION CARDS
          ================================================== */}

          <div
            className="
              mt-12
              grid
              w-full
              max-w-4xl
              grid-cols-1
              gap-5
              sm:grid-cols-2
            "
          >
            {cards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => handleCardClick(card.prompt)}
                className="
                  group
                  relative
                  min-h-[220px]
                  cursor-pointer
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/[0.08]
                  bg-[#0b1220]/80
                  p-7
                  text-left
                  shadow-[0_15px_50px_rgba(0,0,0,0.25)]
                  backdrop-blur-xl
                  transition-all
                  duration-500

                  hover:-translate-y-1.5
                  hover:border-blue-400/30
                  hover:bg-[#101a2d]/90
                  hover:shadow-[0_0_45px_rgba(59,130,246,0.14)]

                  active:translate-y-0
                  active:scale-[0.99]

                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/30
                "
              >
                {/* Card top gradient */}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-[2px]
                    w-0
                    bg-gradient-to-r
                    from-blue-500
                    via-purple-500
                    to-pink-500
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

                {/* Card glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-48
                    w-48
                    rounded-full
                    bg-blue-500/[0.045]
                    blur-3xl
                    transition-all
                    duration-700
                    group-hover:scale-150
                    group-hover:bg-purple-500/[0.12]
                  "
                />

                {/* Secondary glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-24
                    h-48
                    w-48
                    rounded-full
                    bg-purple-500/[0.025]
                    blur-3xl
                    transition-all
                    duration-700
                    group-hover:scale-125
                    group-hover:bg-blue-500/[0.08]
                  "
                />

                {/* =================================================
                    ICON
                ================================================== */}

                <div
                  className="
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.04]
                    text-3xl
                    shadow-inner
                    transition-all
                    duration-500

                    group-hover:scale-110
                    group-hover:rotate-2
                    group-hover:border-blue-400/30
                    group-hover:bg-blue-500/10
                    group-hover:shadow-[0_0_30px_rgba(99,102,241,0.20)]
                  "
                >
                  {card.icon}
                </div>

                {/* =================================================
                    TEXT
                ================================================== */}

                <div className="relative mt-7">
                  <h3
                    className="
                      text-xl
                      font-semibold
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-blue-300
                    "
                  >
                    {card.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-md
                      text-sm
                      leading-6
                      text-slate-500
                      transition-colors
                      duration-300
                      group-hover:text-slate-400
                    "
                  >
                    {card.description}
                  </p>
                </div>

                {/* =================================================
                    ACTION INDICATOR
                ================================================== */}

                <div
                  className="
                    absolute
                    bottom-6
                    right-6
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    text-lg
                    text-slate-600
                    opacity-0
                    transition-all
                    duration-300

                    group-hover:translate-x-1
                    group-hover:border-blue-400/20
                    group-hover:bg-blue-500/10
                    group-hover:text-blue-400
                    group-hover:opacity-100
                  "
                >
                  →
                </div>

                {/* Bottom shine */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-px
                    w-0
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-blue-400
                    to-transparent
                    transition-all
                    duration-700
                    group-hover:w-3/4
                  "
                />
              </button>
            ))}
          </div>

          {/* =================================================
              READY STATUS
          ================================================== */}

          <div
            className="
              mt-10
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.04]
              bg-white/[0.015]
              px-4
              py-2
              text-xs
              text-slate-600
              backdrop-blur-sm
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_8px_rgba(52,211,153,0.7)]
              "
            />

            SumoChat AI is ready
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================
  // CHAT MESSAGES
  // ===========================================================

  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-y-auto
        overflow-x-hidden
        bg-[#050816]
      "
    >
      {/* =====================================================
          CHAT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Blue atmosphere */}

        <div
          className="
            absolute
            left-[20%]
            top-[10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-600/[0.035]
            blur-[160px]
          "
        />

        {/* Purple atmosphere */}

        <div
          className="
            absolute
            right-[5%]
            top-[35%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-purple-600/[0.035]
            blur-[160px]
          "
        />

        {/* Cyan atmosphere */}

        <div
          className="
            absolute
            bottom-[-200px]
            left-1/2
            h-[450px]
            w-[450px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/[0.025]
            blur-[160px]
          "
        />

        {/* Subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.012]
            bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)]
            bg-[size:64px_64px]
          "
        />
      </div>

      {/* =====================================================
          MESSAGES
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-5xl
          flex-col
          px-4
          py-8
          sm:px-6
        "
      >
        {messages.map((message, index) => (
          <Message
            key={message.id || index}
            message={message}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatWindow;