import { Scale, PenLine, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import BotInput from "../components/BotPage/BotInput";
import ConfirmModal from "../components/ConfirmModal";
import RenderBotMessage from "../components/BotPage/RenderBotMessage";
import { sendPrompt } from "../api_page/prompt";
import "../global.css";

export default function BotPage() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        if (!isLoading && messages.length > 0) {
            inputRef.current?.focus();
        }
    }, [isLoading, messages]);

    const handleSend = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage = {
            text: inputText,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setIsLoading(true);

        try {
            const botReply = await sendPrompt(inputText);

            setMessages((prev) => [
                ...prev,
                {
                    text: botReply.response || JSON.stringify(botReply),
                    sender: "bot",
                    timestamp: new Date(),
                },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    text: "Sorry, there was an error contacting the server.",
                    sender: "bot",
                    timestamp: new Date(),
                },
            ]);
        }
        setIsLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearChat = () => {
        setMessages([]);
        setShowConfirm(false);
    };

    return (
        <div className="w-full min-h-screen flex bg-gray-50">

            {/* Sidebar */}
            <div className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 overflow-hidden bg-white border-r border-gray-200 shadow-sm`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
                    <button onClick={() => setSidebarOpen(false)} className="p-1">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-4 text-gray-600">
                    <p className="text-sm">No saved chats yet.</p>
                </div>
            </div>

            {/* Main Container */}
            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 w-full mx-auto max-w-[1600px]">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="mb-4 flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 w-fit"
                    >
                        <Menu size={18} />
                        Open Sidebar
                    </button>

                    <div className="flex-1 flex flex-col items-center w-full relative min-h-0">

                        {messages.length > 0 && (
                            <div className="absolute top-0 right-0 z-20">
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 transition-all shadow"
                                >
                                    <PenLine size={16} />
                                    <span className="hidden sm:inline">Clear Chat</span>
                                </button>
                            </div>
                        )}

                        {messages.length === 0 ? (
                            <div className="flex flex-col justify-center items-center h-full px-4">
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
                                    <div className="relative w-28 h-28 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl">
                                        <Scale size={56} className="text-white" strokeWidth={1.5} />
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                                    Welcome to Legal AI Assistant
                                </h1>

                                <p className="text-gray-600 text-lg text-center max-w-2xl mb-12">
                                    Ask me anything related to legal matters.
                                </p>
                            </div>
                        ) : (
                            <div className="flex-1 w-full flex flex-col min-h-0 mb-4">

                                {/* Chat Container */}
                                <div
                                    ref={chatContainerRef}
                                    className="flex-1 w-full max-w-[1100px] mx-auto overflow-y-auto space-y-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-200 custom-scrollbar max-h-[75vh]"
                                >

                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className="flex flex-col max-w-[85%]">
                                                <div
                                                    className={`px-5 py-3.5 rounded-2xl text-sm shadow-md ${
                                                        msg.sender === "user"
                                                            ? "bg-blue-600 text-white rounded-br-md"
                                                            : "bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-md"
                                                    }`}
                                                >
                                                    <RenderBotMessage message={msg} />
                                                </div>
                                                <div className={`text-xs mt-1 px-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                                                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Skeleton Loader */}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="w-48 h-16 bg-gray-200 rounded-2xl animate-pulse border border-gray-300"></div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                        )}
                    </div>

                    <BotInput
                        inputRef={inputRef}
                        inputText={inputText}
                        setInputText={setInputText}
                        handleKeyDown={handleKeyDown}
                        handleSend={handleSend}
                        isLoading={isLoading}
                    />
                </div>

                {showConfirm && (
                    <ConfirmModal
                        show={showConfirm}
                        title="Confirm Action"
                        message="Are you sure you want to clear the chat history?"
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={clearChat}
                    />
                )}
            </div>
        </div>
    );
}