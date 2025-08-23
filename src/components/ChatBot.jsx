import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#104686]    text-white p-4 rounded-full shadow-lg focus:outline-none"
        >
          {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[500px] bg-white border border-gray-300 shadow-xl rounded-lg flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-[#104686]   text-white px-4 py-3 font-semibold">
            Chat Support
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="bg-gray-100 p-2 rounded-lg w-fit max-w-[70%]">
              Hello! How can I help you today?
            </div>
          </div>

          {/* Input Box */}
          <div className="border-t border-gray-300 p-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
