import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-amber-300 text-amber-800 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-9xl font-bold"
      >
        404
      </motion.div>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl mt-4 mb-6"
      >
        Oops! We couldn’t find that page.
      </motion.p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-300"
      >
        <PawPrint className="w-5 h-5" />
        Go Home
      </Link>
    </div>
  );
}
