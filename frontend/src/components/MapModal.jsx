import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

const MapModal = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog
      as="div"
      className="relative z-50"
      open={isOpen}
      onClose={setIsOpen}
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel as={Fragment}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-3xl rounded-xl bg-white shadow-xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Dialog.Title className="text-lg font-semibold text-gray-800">
                Our Location
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-600 hover:text-red-500"
              >
                <IoClose />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                title="Prani Seva Ashram Location"
                src="https://www.google.com/maps?q=135-B,+B.A.+Chowk,+Pune+-+411001&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MapModal;
