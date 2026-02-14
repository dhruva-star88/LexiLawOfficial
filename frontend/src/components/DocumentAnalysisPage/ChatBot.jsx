import React, { useState, useRef, useEffect } from "react";
import { SendIcon } from "lucide-react";
import { askDocumentAssistant } from "../../api_page/index";
import { parseBotResponse } from '../../utils/parseBotResponse';

const ChatBot = ({ documentId }) => {

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your legal document assistant. Ask me any questions about this document.",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !documentId) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await askDocumentAssistant(documentId, input);

      const parsedResponse = parseBotResponse(res.answer);

      const botResponse = {
        id: Date.now() + 1,
        text: parsedResponse,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botResponse]);

    } catch (error) {
      const errorMessage = {
        id: Date.now() + 2,
        text: "Sorry, something went wrong while processing your request.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
      console.error("Assistant error:", error.response?.data || error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Document Assistant
        </h2>
      </div>

      <div className="bg-gray-50 rounded-lg border border-gray-200 mb-4">
        <div className="h-64 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-3/4 rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {Array.isArray(message.text)
                  ? message.text.map((el, index) => {
                      switch (el.type) {

                        case "heading":
                          return (
                            <h3
                              key={index}
                              className="font-bold text-lg mb-2"
                              dangerouslySetInnerHTML={{ __html: el.content }}
                            />
                          );

                        case "paragraph":
                          return (
                            <p
                              key={index}
                              className="mb-2"
                              dangerouslySetInnerHTML={{ __html: el.content }}
                            />
                          );

                        case "list":
                          return (
                            <ul key={index} className="list-disc pl-5 mb-2">
                              {el.content.map((item, i) => (
                                <li
                                  key={i}
                                  dangerouslySetInnerHTML={{ __html: item }}
                                />
                              ))}
                            </ul>
                          );

                        case "table":
                          return (
                            <table key={index} className="table-auto border mb-3">
                              <tbody>
                                {el.content.map((row, i) => {
                                  const cells = row
                                    .slice(1, -1)
                                    .split("|")
                                    .map((c) => c.trim());

                                  return (
                                    <tr key={i}>
                                      {cells.map((cell, j) => (
                                        <td
                                          key={j}
                                          className="border px-2 py-1"
                                          dangerouslySetInnerHTML={{ __html: cell }}
                                        />
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          );

                        case "html":
                          return (
                            <div
                              key={index}
                              dangerouslySetInnerHTML={{ __html: el.content }}
                            />
                          );

                        case "spacing":
                          return <div key={index} className={el.className}></div>;

                        default:
                          return null;
                      }
                    })
                  : message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm">
              AI is thinking...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question about the document..."
          className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded-r-lg px-4 py-2 hover:bg-blue-700 flex items-center"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
