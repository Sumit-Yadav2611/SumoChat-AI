import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import ChatWindow from "./components/Chat/ChatWindow";
import PromptInput from "./components/Chat/PromptInput";

function App() {
  return (
    <div className="flex h-screen bg-[#131314] text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <ChatWindow />

        <PromptInput />
      </div>
    </div>
  );
}

export default App;