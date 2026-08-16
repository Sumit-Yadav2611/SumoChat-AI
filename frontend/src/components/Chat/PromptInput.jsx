import { useRef, useState } from "react";
import { MdMic, MdSend, MdImage } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa";
import toast from "react-hot-toast";

import useChat from "../../hooks/useChat";
import { uploadPDF } from "../../services/documentService";
import { uploadImage } from "../../services/imageService";

function PromptInput() {
  const {
    input,
    setInput,
    sendMessage,
    uploadedDocument,
    setUploadedDocument,
    uploadedImage,
    setUploadedImage,
  } = useChat();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // PDF Upload
  const handlePDFUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      toast.loading("Uploading PDF...", {
        id: "pdf",
      });
      const data = await uploadPDF(file);
      setUploadedDocument(data);

      toast.success("PDF uploaded!", {
        id: "pdf",
      });
    } catch (err) {
      console.error("PDF Upload Error:", err);

      toast.error(err.response?.data?.message || "Failed to upload PDF", {
        id: "pdf",
      });
    }

    // Allows selecting the same file again
    e.target.value = "";
  };

  // =========================
  // Image Upload
  // =========================

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      toast.loading("Uploading image...", {
        id: "image",
      });

      const data = await uploadImage(file);

      setUploadedImage(data.image);

      toast.success("Image uploaded!", {
        id: "image",
      });
    } catch (err) {
      console.error("Image Upload Error:", err);

      toast.error(err.response?.data?.message || "Failed to upload image", {
        id: "image",
      });
    }

    // Allows selecting the same image again
    e.target.value = "";
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in this browser.");
      return;
    }

    // Stop listening
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setListening(true);

      toast.success("Listening...", {
        id: "voice",
      });
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);

      setListening(false);

      toast.error("Could not recognize your voice.", {
        id: "voice",
      });
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };
  return (
    <div
      className="
        relative
        border-t
        border-white/5
        bg-[#050816]/90
        px-5
        py-5
        backdrop-blur-xl
        sm:px-8
      "
    >
      {/* Hidden PDF Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handlePDFUpload}
      />

      {/* Hidden Image Input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Attachment Preview */}

      {(uploadedDocument || uploadedImage) && (
        <div className="relative mx-auto mb-3 flex w-full max-w-5xl flex-wrap gap-3">
          {/* PDF */}

          {uploadedDocument && (
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-blue-500/20
                bg-[#0b1220]/90
                px-4
                py-3
                shadow-[0_0_20px_rgba(59,130,246,0.08)]
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/10
                  text-lg
                "
              >
                📄
              </div>

              <div className="min-w-0">
                <p className="max-w-[180px] truncate text-sm font-medium text-white">
                  {uploadedDocument.fileName}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {uploadedDocument.pages} Pages
                </p>
              </div>

              <button
                type="button"
                onClick={() => setUploadedDocument(null)}
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-slate-500
                  transition
                  hover:bg-red-500/10
                  hover:text-red-400
                "
                title="Remove PDF"
              >
                ✕
              </button>
            </div>
          )}

          {/* IMAGE */}

          {uploadedImage && (
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-purple-500/20
                bg-[#0b1220]/90
                px-3
                py-2
                shadow-[0_0_20px_rgba(139,92,246,0.08)]
              "
            >
              <img
                src={uploadedImage.url}
                alt={uploadedImage.fileName}
                className="
                  h-12
                  w-12
                  shrink-0
                  rounded-xl
                  border
                  border-white/10
                  object-cover
                "
              />

              <p className="max-w-[160px] truncate text-sm font-medium text-white">
                {uploadedImage.fileName}
              </p>

              <button
                type="button"
                onClick={() => setUploadedImage(null)}
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-slate-500
                  transition
                  hover:bg-red-500/10
                  hover:text-red-400
                "
                title="Remove image"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Input */}
      <div
        className="
          group
          relative
          mx-auto
          flex
          w-full
          max-w-5xl
          items-center
          rounded-[24px]
          border
          border-white/10
          bg-[#0b1220]/90
          px-3
          py-2
          shadow-[0_10px_40px_rgba(0,0,0,0.25)]
          backdrop-blur-2xl
          transition-all
          duration-300
          hover:border-white/20
          focus-within:border-blue-500/50
          focus-within:shadow-[0_0_35px_rgba(59,130,246,0.15)]
        "
      >
        {/* PDF */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            text-slate-400
            transition
            hover:bg-blue-500/10
            hover:text-blue-400
          "
          title="Upload PDF"
        >
          <FaPaperclip size={17} />
        </button>

        {/* IMAGE */}

        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            text-slate-400
            transition
            hover:bg-purple-500/10
            hover:text-purple-400
          "
          title="Upload Image"
        >
          <MdImage size={22} />
        </button>

        {/* TEXT */}

        <input
          type="text"
          placeholder="Ask SumoChat AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            min-w-0
            flex-1
            bg-transparent
            px-3
            text-[15px]
            text-white
            outline-none
            placeholder:text-slate-500
          "
        />
        {/* MICROPHONE */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`
    relative
    flex
    h-10
    w-10
    shrink-0
    items-center
    justify-center
    rounded-xl
    transition-all
    duration-300
    ${
      listening
        ? "bg-red-500/15 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
        : "text-slate-400 hover:bg-blue-500/10 hover:text-blue-400"
    }
  `}
          title={listening ? "Stop listening" : "Voice Input"}
        >
          <MdMic size={21} />

          {listening && (
            <span
              className="
        absolute
        inset-0
        rounded-xl
        border
        border-red-400/40
        animate-ping
      "
            />
          )}
        </button>

        {/* SEND */}

        <button
          type="button"
          onClick={sendMessage}
          className="
            ml-1
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            text-white
            shadow-[0_0_18px_rgba(99,102,241,0.25)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:from-blue-500
            hover:to-purple-500
            hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]
          "
          title="Send"
        >
          <MdSend size={20} />
        </button>
      </div>

      {/* Disclaimer */}

      <p
        className="
          mx-auto
          mt-2
          w-full
          max-w-5xl
          text-center
          text-[10px]
          tracking-wide
          text-slate-600
        "
      >
        SumoChat AI can make mistakes. Check important information.
      </p>
    </div>
  );
}

export default PromptInput;
