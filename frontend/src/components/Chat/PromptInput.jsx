import { MdMic, MdSend } from "react-icons/md";
import useChat from "../../hooks/useChat";

function PromptInput() {
  const { input, setInput, sendMessage } = useChat();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="p-6">
      <div className="bg-[#2d2e30] rounded-full flex items-center px-5 py-3">
        <input
          type="text"
          placeholder="Ask Gemini..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white"
        />

        <button className="text-2xl mx-2 hover:text-blue-400 transition">
          <MdMic />
        </button>

        <button
          onClick={sendMessage}
          className="text-2xl hover:text-blue-400 transition"
        >
          <MdSend />
        </button>
      </div>
    </div>
  );
}

export default PromptInput;