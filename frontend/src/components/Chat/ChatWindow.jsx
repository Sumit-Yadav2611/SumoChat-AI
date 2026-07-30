import useChat from "../../hooks/useChat";
import Message from "./Message";
import Thinking from "./Thinking";

const cards = [
  {
    title: "Brainstorm ideas",
    icon: "✨",
  },
  {
    title: "Explain a topic",
    icon: "📖",
  },
  {
    title: "Help with coding",
    icon: "💻",
  },
  {
    title: "Improve writing",
    icon: "✍️",
  },
];

function ChatWindow() {
  const { messages } = useChat();

  // Show Welcome Screen
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center px-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
          Hello, Sumit.
        </h1>

        <p className="text-3xl text-gray-400 mt-3">How can I help you today?</p>

        <div className="grid grid-cols-2 gap-5 mt-12 w-full max-w-4xl">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#1e1f20] rounded-2xl p-6 cursor-pointer hover:bg-[#2d2e30] transition"
            >
              <div className="text-3xl">{card.icon}</div>

              <h3 className="mt-5 text-lg font-medium">{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show Chat Messages
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

export default ChatWindow;
