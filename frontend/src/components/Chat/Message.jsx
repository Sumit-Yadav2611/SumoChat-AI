import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function Message({ message }) {
  const isUser = message.role === "user";

  // Loading animation
  if (message.loading) {
    return (
      <div className="w-full flex justify-start my-6">
        <div className="flex items-center gap-3 px-6 py-4">
          <div className="flex gap-1">
            <div
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>

          <p className="text-gray-400 text-lg">Thinking...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} my-6`}
    >
      <div
        className={`max-w-4xl rounded-2xl px-6 py-4 ${
          isUser
            ? "bg-[#303030] text-white"
            : "bg-transparent text-gray-100"
        }`}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-6">{children}</h1>
              ),

              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold mt-8 mb-4">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold mt-6 mb-3">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
                <p className="leading-8 text-lg mb-4 text-gray-200">
                  {children}
                </p>
              ),

              li: ({ children }) => (
                <li className="ml-6 mb-2 list-disc">
                  {children}
                </li>
              ),

              table: ({ children }) => (
                <table className="border border-gray-700 rounded-xl my-5 overflow-hidden">
                  {children}
                </table>
              ),

              th: ({ children }) => (
                <th className="border px-4 py-3 bg-[#2c2c2c]">
                  {children}
                </th>
              ),

              td: ({ children }) => (
                <td className="border px-4 py-3">
                  {children}
                </td>
              ),

              code({ inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <SyntaxHighlighter
                    language={match[1]}
                    style={oneDark}
                    customStyle={{
                      borderRadius: "15px",
                      padding: "20px",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-800 px-2 py-1 rounded">
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content || ""}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default Message;