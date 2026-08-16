import { useState } from "react";
import {
  FaSearch,
  FaRobot,
  FaComments,
  FaFilePdf,
  FaImage,
  FaBug,
  FaChevronDown,
  FaEnvelope,
  FaQuestionCircle,
  FaArrowLeft,
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

const faqs = [
  {
    question: "How do I start a new chat?",
    answer:
      "Click the New Chat button in the sidebar. SumoChat AI will create a fresh conversation for you.",
  },
  {
    question: "Can I upload a PDF?",
    answer:
      "Yes. Use the PDF attachment button near the message box to upload a PDF. You can then ask questions about its content.",
  },
  {
    question: "Can SumoChat AI analyze images?",
    answer:
      "Yes. Upload an image using the image button and ask SumoChat AI to explain, describe, or analyze the image.",
  },
  {
    question: "How do I change my profile photo?",
    answer:
      "Open your profile from the account menu, then use the Change Photo option to upload a new profile picture.",
  },
  {
    question: "How do I access my previous chats?",
    answer:
      "Your previous conversations appear in the Recent section of the sidebar. Click a conversation to open it.",
  },
  {
    question: "What can I ask SumoChat AI?",
    answer:
      "You can ask questions, explain topics, generate ideas, improve writing, write code, analyze PDFs, and analyze images.",
  },
];

const helpArticles = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of using SumoChat AI.",
    icon: FaRobot,
    iconStyle: "bg-blue-500/10 text-blue-400",

    content: {
      heading: "Getting Started with SumoChat AI",
      description: "Everything you need to know to start using SumoChat AI.",

      steps: [
        "Click New Chat from the sidebar to start a conversation.",
        "Type your question into the message box at the bottom.",
        "Press Enter or click the Send button.",
        "Use the Recent section to return to previous conversations.",
        "Use your profile menu to manage your account.",
      ],

      tips: [
        "Ask clear and specific questions for better answers.",
        "You can ask follow-up questions in the same conversation.",
        "Use PDF and Image uploads when you want the AI to analyze files.",
      ],
    },
  },

  {
    id: "ai-chat",
    title: "AI Chat",
    description: "Learn how to ask questions and get better responses.",
    icon: FaComments,
    iconStyle: "bg-purple-500/10 text-purple-400",

    content: {
      heading: "Using AI Chat",
      description: "Learn how to have better conversations with SumoChat AI.",

      steps: [
        "Open a new chat using the New Chat button.",
        "Enter your question or request in the message box.",
        "Press Enter or click the Send button.",
        "Wait while SumoChat AI processes your request.",
        "Continue asking follow-up questions to keep the conversation going.",
      ],

      tips: [
        "Instead of asking 'Explain coding', try 'Explain JavaScript promises with an example'.",
        "You can ask the AI to simplify, summarize, compare, or explain its previous answer.",
        "For programming questions, include your code and the error message.",
      ],
    },
  },

  {
    id: "pdf-analysis",
    title: "PDF Analysis",
    description: "Upload documents and ask questions about them.",
    icon: FaFilePdf,
    iconStyle: "bg-pink-500/10 text-pink-400",

    content: {
      heading: "Analyzing PDF Documents",
      description:
        "Upload a PDF and let SumoChat AI help you understand its contents.",

      steps: [
        "Click the paperclip button near the message input.",
        "Select a PDF from your computer.",
        "Wait for the PDF upload to finish.",
        "Type your question about the document.",
        "Send the message and SumoChat AI will analyze the uploaded document.",
      ],

      tips: [
        "Ask specific questions about the document.",
        "You can ask for summaries or explanations.",
        "For long documents, mention the topic or section you are interested in.",
      ],
    },
  },

  {
    id: "image-analysis",
    title: "Image Analysis",
    description: "Upload images and ask the AI to analyze them.",
    icon: FaImage,
    iconStyle: "bg-cyan-500/10 text-cyan-400",

    content: {
      heading: "Analyzing Images",
      description:
        "Use SumoChat AI's image understanding capabilities to analyze uploaded images.",

      steps: [
        "Click the image button near the message input.",
        "Select an image from your computer.",
        "Wait for the image upload to finish.",
        "Ask what you want SumoChat AI to understand about the image.",
        "Send your message.",
      ],

      tips: [
        "You can ask the AI to describe an image.",
        "You can ask questions about visible text or objects.",
        "For screenshots, explain what part of the screenshot you want help with.",
      ],
    },
  },

  {
    id: "report-problem",
    title: "Report a Problem",
    description: "Something isn't working? Find troubleshooting help.",
    icon: FaBug,
    iconStyle: "bg-red-500/10 text-red-400",

    content: {
      heading: "Troubleshooting SumoChat AI",
      description: "Try these steps if something is not working correctly.",

      steps: [
        "Refresh the page and try the action again.",
        "Check that your internet connection is working.",
        "If a file upload fails, try uploading the file again.",
        "If a chat response gets stuck, start a new chat.",
        "If the problem continues, contact support with a description of the issue.",
      ],

      tips: [
        "Mention what you were trying to do.",
        "Include the exact error message if one appears.",
        "A screenshot of the problem can help explain the issue.",
      ],
    },
  },
];

function Help() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showSupport, setShowSupport] = useState(false);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredArticles = helpArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase()),
  );

  // =========================================================
  // ARTICLE DETAIL PAGE
  // =========================================================

  if (selectedArticle) {
    const article = selectedArticle;

    return (
      <div className="h-full overflow-y-auto bg-[#050914] text-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-10 lg:px-10">
          {/* Back Button */}

          <button
            onClick={() => setSelectedArticle(null)}
            className="
              group
              mb-8
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-[#0b1220]
              px-4
              py-2.5
              text-sm
              text-slate-400
              transition-all
              hover:border-blue-500/30
              hover:bg-blue-500/10
              hover:text-blue-400
            "
          >
            <FaArrowLeft
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />
            Back to Help
          </button>

          {/* Article Header */}

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-[#0b1220]/80
              p-8
              backdrop-blur-xl
              sm:p-10
            "
          >
            <div className="flex items-start gap-5">
              <div
                className={`
                  flex
                  h-14
                  w-14
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  ${article.iconStyle}
                `}
              >
                <article.icon size={24} />
              </div>

              <div>
                <h1
                  className="
                    bg-gradient-to-r
                    from-blue-400
                    via-purple-400
                    to-pink-500
                    bg-clip-text
                    text-3xl
                    font-bold
                    text-transparent
                    sm:text-4xl
                  "
                >
                  {article.content.heading}
                </h1>

                <p className="mt-3 text-slate-400">
                  {article.content.description}
                </p>
              </div>
            </div>

            {/* Steps */}

            <div className="mt-10">
              <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold">
                <span className="text-blue-400">01.</span>
                How it works
              </h2>

              <div className="space-y-3">
                {article.content.steps.map((step, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      gap-4
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.02]
                      p-4
                      transition-all
                      hover:border-blue-500/20
                      hover:bg-blue-500/[0.03]
                    "
                  >
                    <div
                      className="
                        flex
                        h-7
                        w-7
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-500/10
                        text-sm
                        font-semibold
                        text-blue-400
                      "
                    >
                      {index + 1}
                    </div>

                    <p className="text-sm leading-7 text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}

            <div
              className="
                mt-10
                rounded-2xl
                border
                border-purple-500/20
                bg-purple-500/[0.04]
                p-6
              "
            >
              <h2 className="flex items-center gap-3 text-lg font-semibold">
                <FaLightbulb className="text-purple-400" />
                Helpful Tips
              </h2>

              <div className="mt-4 space-y-3">
                {article.content.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="mt-1 flex-shrink-0 text-emerald-400" />

                    <p className="text-sm leading-6 text-slate-400">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN HELP PAGE
  // =========================================================

  return (
    <div className="h-full overflow-y-auto bg-[#050914] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-10">
        {/* HEADER */}

        <div className="mb-10">
          <h1
            className="
              bg-gradient-to-r
              from-blue-400
              via-purple-400
              to-pink-500
              bg-clip-text
              text-4xl
              font-bold
              tracking-tight
              text-transparent
              sm:text-5xl
            "
          >
            Help & Support
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            Everything you need to get the most out of SumoChat AI.
          </p>
        </div>

        {/* SEARCH */}

        <div className="relative mb-10">
          <FaSearch
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            type="text"
            placeholder="Search for help..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-[#0b1220]/80
              py-4
              pl-14
              pr-5
              text-white
              outline-none
              transition-all
              placeholder:text-slate-600
              focus:border-blue-500/40
              focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]
            "
          />
        </div>

        {/* HELP ARTICLES */}

        <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => {
            const Icon = article.icon;

            return (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="
                  group
                  cursor-pointer
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#0b1220]/80
                  p-6
                  text-left
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-500/30
                  hover:bg-[#0d1628]
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.10)]
                "
              >
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    ${article.iconStyle}
                    transition-all
                    duration-300
                    group-hover:scale-110
                  `}
                >
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {article.description}
                </p>

                <div className="mt-4 text-sm text-blue-400">Read guide →</div>
              </button>
            );
          })}
        </div>

        {/* FAQ */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#0b1220]/80
            backdrop-blur-xl
          "
        >
          <div className="border-b border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-purple-500/10
                  text-purple-400
                "
              >
                <FaQuestionCircle size={21} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Frequently Asked Questions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Find quick answers to common questions.
                </p>
              </div>
            </div>
          </div>

          <div>
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No help articles found.
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-5
                        px-6
                        py-5
                        text-left
                        transition-all
                        hover:bg-white/[0.03]
                        sm:px-8
                      "
                    >
                      <span className="font-medium text-slate-200">
                        {faq.question}
                      </span>

                      <FaChevronDown
                        className={`
                          flex-shrink-0
                          text-slate-500
                          transition-transform
                          duration-300
                          ${isOpen ? "rotate-180 text-blue-400" : ""}
                        `}
                      />
                    </button>

                    <div
                      className={`
                        grid
                        transition-all
                        duration-300
                        ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }
                      `}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm leading-7 text-slate-500 sm:px-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* CONTACT SUPPORT */}

        <div
          className="
            mt-8
            rounded-3xl
            border
            border-blue-500/20
            bg-gradient-to-r
            from-blue-500/[0.06]
            via-purple-500/[0.06]
            to-pink-500/[0.06]
            p-8
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-500/10
              text-blue-400
            "
          >
            <FaEnvelope size={22} />
          </div>

          <h2 className="mt-5 text-xl font-semibold">Still need help?</h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            If you cannot find what you're looking for, contact the SumoChat AI
            support team.
          </p>

          <button
            onClick={() => setShowSupport(true)}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-purple-500
              px-6
              py-3
              font-medium
              text-white
              shadow-[0_0_25px_rgba(99,102,241,0.15)]
              transition-all
              hover:-translate-y-0.5
              hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]
            "
          >
            <FaEnvelope />
            Contact Support
          </button>
        </div>

        <div className="h-12" />
      </div>

      {/* =====================================================
          CONTACT SUPPORT MODAL
      ===================================================== */}

      {showSupport && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            px-4
            backdrop-blur-sm
          "
          onClick={() => setShowSupport(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-[#0b1220]
              p-7
              shadow-[0_0_60px_rgba(59,130,246,0.12)]
            "
          >
            {/* Icon */}

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-500/20
                to-purple-500/20
                text-blue-400
              "
            >
              <FaEnvelope size={25} />
            </div>

            <h2 className="mt-5 text-center text-2xl font-semibold">
              Contact Support
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Have a question or found a problem? Send us an email and we'll
              take a look.
            </p>

            {/* Email */}

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
                text-center
              "
            >
              <p className="text-xs uppercase tracking-wider text-slate-600">
                Support Email
              </p>

              <p className="mt-2 text-sm font-medium text-blue-400">
                support@sumochat.ai
              </p>
            </div>

            {/* Buttons */}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowSupport(false)}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-white/10
                  px-4
                  py-3
                  text-sm
                  text-slate-400
                  transition
                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >
                Cancel
              </button>

              <a
                href="mailto:support@sumochat.ai?subject=SumoChat%20AI%20Support%20Request&body=Hello%20SumoChat%20AI%20Support%2C%0A%0AI%20need%20help%20with%3A%0A%0A"
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-500
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]
                "
              >
                <FaEnvelope />
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Help;
