import { useState } from "react";
import { toast } from "sonner";
import {
  FaPaperPlane,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa"; // Updated icons for better meaning

const ReplyModal = ({ isOpen, onSendReply, onCancel, email }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (replyMessage.trim() === "") {
      toast.error("Please enter a reply message.");
      return;
    }

    const toastId = toast.custom(
      (t) => (
        <div className="bg-white p-5 rounded-lg shadow-xl border border-gray-200 flex flex-col md:flex-row items-center gap-4 w-full md:max-w-lg transition-all duration-300 ease-out">
          <div className="flex-grow text-center md:text-left mb-3 md:mb-0">
            {/* <p className="font-bold text-gray-800 text-xl mb-1">
              Confirm Reply?
            </p>
            <p className="text-sm text-gray-600">
              You are about to send a reply to{" "}
              <strong className="text-blue-600 break-all">{email}</strong>. Are
              you sure?
            </p> */}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                confirmSend();
              }}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <FaCheckCircle size={16} /> Confirm Send
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <FaTimesCircle size={16} /> Don't Send
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keep toast open until user interacts
        position: "top-center",
        // No need for richColors here as we're using a custom component
      }
    );
  };

  const confirmSend = async () => {
    setIsSubmitting(true);
    try {
      await onSendReply(email, replyMessage);
      setReplyMessage("");
      toast.success("Reply sent successfully!", { duration: 3000 }); // Short duration for success
    } catch (error) {
      toast.error("Failed to send reply. Please try again.", {
        duration: 5000,
      }); // Longer duration for error
      console.error("Error sending reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in"
      aria-modal="true"
      role="dialog"
      aria-labelledby="replyModalTitle"
    >
      <div className="bg-gray-200 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close reply modal"
        >
          <FaTimes size={20} />
        </button>

        <h2
          id="replyModalTitle"
          className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"
        >
          <FaPaperPlane className="text-blue-500" /> Reply to Inquiry
        </h2>

        <p className="text-gray-600 mb-4 text-sm">
          Sending reply to:{" "}
          <strong className="text-gray-800 break-all">{email}</strong>
        </p>

        <textarea
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          placeholder="Type your reply here..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[120px] text-gray-700"
          rows="5"
          aria-label="Reply message content"
          disabled={isSubmitting}
        ></textarea>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Reply"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
