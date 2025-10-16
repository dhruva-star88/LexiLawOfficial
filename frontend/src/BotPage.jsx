import {
  Scale,
  MessageSquare,
  Send,
  PenLine,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
} from "lucide-react";
import React, { useState } from "react";
import Navbar from "./components/Navbar";

export default function BotPage() {
  const [contextOpen, setContextOpen] = useState(true);
  const [selectedRisk, setSelectedRisk] = useState("red");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("what is th");
  const [showNotification, setShowNotification] = useState(true);
  const [activeTab, setActiveTab] = useState("risks");

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          text: inputText,
          sender: "user", // add sender field
          timestamp: new Date(),
        },
        {
          text: "This is a sample bot reply!", // dummy bot reply
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setInputText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col p-5 max-w-6xl mx-auto w-full">
        {/* Context Selector */}
        

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col justify-center items-center min-h-[400px]">
          {messages.length === 0 ? (
            <>
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-lg">
                <Scale size={40} color="white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
                Welcome to Legal AI Assistant
              </h1>
              <p className="text-gray-500 text-base text-center max-w-xl">
                Ask me anything about legal matters, contracts, or risk
                assessments. I'm here to help!
              </p>
            </>
          ) : (
            <div className="flex-1 w-full max-w-2xl mx-auto overflow-y-auto space-y-3 p-4 bg-white rounded-lg shadow-inner">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg text-sm max-w-[70%] ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bar */}
        {/* {showNotification && selectedRisk && (
          <div className="bg-emerald-100 border border-emerald-300 rounded-md p-3 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-emerald-800 text-sm font-medium">
                Selected: {selectedRisk.toUpperCase()} risk items
              </span>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="p-1 hover:bg-emerald-200 rounded"
            >
              <X size={18} className="text-emerald-700" />
            </button>
          </div>
        )} */}

        {/* Clear Chat Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50"
          >
            <PenLine size={16} />
            Clear Chat
          </button>
        </div>

        {/* Chat Input */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare size={20} className="text-gray-400" />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="flex-1 border-none outline-none text-gray-800 text-sm p-2"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-md bg-blue-500 flex items-center justify-center hover:bg-blue-600"
            >
              <Send size={20} color="white" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center">
            Press 'Enter' to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
