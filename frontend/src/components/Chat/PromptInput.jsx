import { useRef } from "react";
import { MdMic, MdSend } from "react-icons/md";
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Upload PDF
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      toast.loading("Uploading PDF...", { id: "pdf" });

      const data = await uploadPDF(file);

      setUploadedDocument(data);

      toast.success("PDF uploaded!", {
        id: "pdf",
      });
    } catch (err) {
      console.error(err);

      toast.error("Failed to upload PDF", {
        id: "pdf",
      });
    }
  };

  // Upload Image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

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
      console.error(err);

      toast.error("Failed to upload image", {
        id: "image",
      });
    }
  };

  return (
    <div className="border-t border-[#2d2e30] bg-[#131314] px-6 py-4">

      {/* Hidden Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handlePDFUpload}
      />

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Attachments */}
      {(uploadedDocument || uploadedImage) && (
        <div className="mb-3 flex flex-wrap gap-3">

          {/* PDF */}
          {uploadedDocument && (
            <div className="flex items-center gap-3 rounded-xl bg-[#1e1f20] border border-[#303030] px-4 py-2">

              📄

              <div>
                <p className="text-sm text-white truncate max-w-[180px]">
                  {uploadedDocument.fileName}
                </p>

                <p className="text-xs text-gray-400">
                  {uploadedDocument.pages} Pages
                </p>
              </div>

              <button
                onClick={() =>
                  setUploadedDocument(null)
                }
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

            </div>
          )}

          {/* Image */}
          {uploadedImage && (
            <div className="flex items-center gap-3 rounded-xl bg-[#1e1f20] border border-[#303030] px-3 py-2">

              <img
                src={uploadedImage.url}
                alt={uploadedImage.fileName}
                className="h-12 w-12 rounded-lg object-cover"
              />

              <p className="text-sm text-white truncate max-w-[160px]">
                {uploadedImage.fileName}
              </p>

              <button
                onClick={() =>
                  setUploadedImage(null)
                }
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

            </div>
          )}

        </div>
      )}

      {/* Input */}
      <div className="flex items-center rounded-3xl bg-[#1e1f20] px-4 py-3">

        {/* PDF */}
        <button
          onClick={() =>
            fileInputRef.current.click()
          }
          className="mr-2 rounded-full p-2 hover:bg-[#2d2e30]"
        >
          <FaPaperclip
            className="text-gray-300"
            size={18}
          />
        </button>

        {/* Image */}
        <button
          onClick={() =>
            imageInputRef.current.click()
          }
          className="mr-2 rounded-full p-2 hover:bg-[#2d2e30]"
        >
          🖼️
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Ask SumoChat AI..."
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-400"
        />

        {/* Voice */}
        <button className="mx-2 rounded-full p-2 hover:bg-[#2d2e30]">
          <MdMic
            size={22}
            className="text-gray-300"
          />
        </button>

        {/* Send */}
        <button
          onClick={sendMessage}
          className="rounded-full p-2 hover:bg-blue-600"
        >
          <MdSend
            size={22}
            className="text-blue-400"
          />
        </button>

      </div>
    </div>
  );
}

export default PromptInput;