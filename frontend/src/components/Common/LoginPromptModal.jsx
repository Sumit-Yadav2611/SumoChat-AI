import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function LoginPromptModal({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-[92%] max-w-md rounded-3xl bg-[#1f1f1f] border border-[#333] shadow-2xl p-8">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
            <FaRobot className="text-white text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-bold text-center text-white">
          Continue with SumoChat AI
        </h2>

        {/* Description */}
        <p className="mt-3 text-center text-gray-400">
          You've used all{" "}
          <span className="text-white font-semibold">
            3 free AI messages
          </span>.
        </p>

        <p className="mt-1 text-center text-gray-400">
          Create a free account to unlock:
        </p>

        {/* Benefits */}
        <div className="mt-6 space-y-3 text-gray-200">

          <div>✅ Unlimited AI Chats</div>

          <div>💾 Save Chat History</div>

          <div>👤 Profile & Avatar</div>

          <div>🔍 Search Conversations</div>

        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">

          <button
            onClick={() => navigate("/login")}
            className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 py-3 font-semibold transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="flex-1 rounded-xl bg-[#2d2e30] hover:bg-[#3d3e40] py-3 font-semibold transition"
          >
            Register
          </button>

        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="mt-5 w-full text-sm text-gray-400 hover:text-white transition"
        >
          Maybe Later
        </button>

      </div>

    </div>
  );
}

export default LoginPromptModal;