import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from 'lucide-react';
const ChatBot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your legal document assistant. Ask me any questions about this rental agreement.", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);
  const generateResponse = (question) => {
    // Mock responses based on keywords in the question
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('rent') || lowerQuestion.includes('payment')) {
      return "The monthly rent is INR 25,000, payable by the 5th of each month. There's a late payment penalty of 2% per month if payment is delayed by more than 10 days.";
    } 
    else if (lowerQuestion.includes('deposit') || lowerQuestion.includes('security')) {
      return "A refundable security deposit of INR 1,50,000 is required. This will be refunded upon termination, subject to deductions for damages or unpaid rent.";
    }
    else if (lowerQuestion.includes('term') || lowerQuestion.includes('duration')) {
      return "The rental agreement has an 11-month term, starting October 1, 2025, and ending August 31, 2026.";
    }
    else if (lowerQuestion.includes('repair') || lowerQuestion.includes('maintenance')) {
      return "The tenant is responsible for minor repairs under INR 2,000. The landlord is responsible for structural repairs and maintaining the property in habitable condition.";
    }
    else if (lowerQuestion.includes('risk')) {
      return "The main risks in this document are related to property damage disputes, late rent payments, and early termination. The agreement has specific clauses addressing each of these risks.";
    }
    else if (lowerQuestion.includes('terminate') || lowerQuestion.includes('end') || lowerQuestion.includes('cancel')) {
      return "The agreement can be terminated with a 2-month notice period. Early termination may result in security deposit forfeiture or additional compensation.";
    }
    else if (lowerQuestion.includes('sublet') || lowerQuestion.includes('commercial')) {
      return "Subletting and commercial use of the property are prohibited under this agreement.";
    }
    else {
      return "I don't have specific information about that in this document. Would you like to know about the rent, security deposit, term duration, repairs, or termination conditions?";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    setMessages([...messages, userMessage]);
    setInput('');
    // Simulate bot thinking with a slight delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateResponse(input),
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-800 ml-2">Document Assistant</h2>
      </div>
      <div className="bg-gray-50 rounded-lg border border-gray-200 mb-4">
        <div className="h-64 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-3/4 rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
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
          className="bg-blue-600 text-white rounded-r-lg px-4 py-2 hover:bg-blue-700 flex items-center"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
export default ChatBot;