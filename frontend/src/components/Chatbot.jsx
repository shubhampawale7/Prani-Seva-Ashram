import { useState } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! How can I help you today?" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg = { sender: "user", text: input };
    const botReply = getBotReply(input);

    setMessages([...messages, newUserMsg, botReply]);
    setInput("");
  };

  const getBotReply = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("donation"))
      return { sender: "bot", text: "You can donate via our Donate page. 🐾" };
    if (lower.includes("adopt"))
      return {
        sender: "bot",
        text: "We don't have adoptions yet, but stay tuned!",
      };
    if (lower.includes("contact"))
      return {
        sender: "bot",
        text: "Feel free to use the contact form or message us here.",
      };
    return {
      sender: "bot",
      text: "I'm still learning! Try asking about donations or help.",
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg"
      >
        {open ? <FiX size={20} /> : <FiMessageSquare size={20} />}
      </button>

      {open && (
        <div className="w-72 h-96 bg-white shadow-lg rounded-lg p-4 mt-2 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 text-sm p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-amber-100 text-gray-700 self-start"
                    : "bg-rose-200 text-gray-800 self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-gray-300 rounded-l px-3 py-1 text-sm"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-r text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
