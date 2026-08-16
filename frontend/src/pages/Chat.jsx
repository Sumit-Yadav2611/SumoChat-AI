import { useContext } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import ChatWindow from "../components/Chat/ChatWindow";
import PromptInput from "../components/Chat/PromptInput";
import LoginPromptModal from "../components/Common/LoginPromptModal";

import { ChatContext } from "../context/ChatContext";
import AIAssistant from "../components/Common/AIAssistant";

const Chat = () => {
  const {
    showLoginModal,
    setShowLoginModal,
  } = useContext(ChatContext);

  return (
    <div className="flex h-screen bg-[#131314] text-white overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <ChatWindow />

        <PromptInput />
      </div> 
      <AIAssistant />
      <LoginPromptModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Chat;