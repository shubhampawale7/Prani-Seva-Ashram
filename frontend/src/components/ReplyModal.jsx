import { useState } from "react";
import { toast } from "sonner";

const ReplyModal = ({ isOpen, onSendReply, onCancel, email }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleTryToSend = () => {
    if (replyMessage.trim() === "") {
      toast.error("Please enter a reply message.");
      return;
    }
    setShowConfirm(true);
  };

  const confirmSend = async () => {
    setSending(true);
    await onSendReply(email, replyMessage);
    setReplyMessage("");
    setSending(false);
    setShowConfirm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Reply to Inquiry
        </h2>
        <textarea
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          placeholder="Type your reply here..."
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          rows="4"
        ></textarea>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleTryToSend}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {sending ? "Sending..." : "Send Reply"}
          </button>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-4 w-72">
              <p className="text-gray-800 mb-4">
                Are you sure you want to send this reply?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSend}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={sending}
                >
                  Yes, Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyModal;
