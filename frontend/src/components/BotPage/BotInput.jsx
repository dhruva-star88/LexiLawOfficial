import React from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";

export default function BotInput({
  inputRef,
  inputText,
  setInputText,
  handleKeyDown,
  handleSend,
  isLoading,
}) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl p-4 md:p-5 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 animate-slideInUp">

      <div className="flex items-center gap-3 mb-2.5 w-full">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0">
          <MessageSquare size={22} className="text-blue-600" />
        </div>

        <textarea
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          disabled={isLoading}
          rows={1}
          className="flex-1 border-none outline-none bg-transparent text-gray-800 text-base p-2 placeholder-gray-400 disabled:opacity-50 resize-none max-h-32 overflow-y-auto"
          style={{ minHeight: "40px" }}
        />

        <button
          onClick={handleSend}
          disabled={isLoading || !inputText.trim()}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95 flex-shrink-0"
        >
          {isLoading ? (
            <Loader2 size={22} className="text-white animate-spin" />
          ) : (
            <Send size={22} className="text-white" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-gray-700 font-mono text-xs">Enter</kbd>
          <span>to send</span>
        </span>
        <span className="text-gray-300">•</span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-gray-700 font-mono text-xs">Shift+Enter</kbd>
          <span>for new line</span>
        </span>
      </div>

    </div>
  );
}
