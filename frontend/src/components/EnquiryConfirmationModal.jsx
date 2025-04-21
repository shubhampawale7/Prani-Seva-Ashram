import React from "react";

const EnquiryConfirmationModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-800">{message}</h3>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => onClose(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={() => onClose(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnquiryConfirmationModal;
