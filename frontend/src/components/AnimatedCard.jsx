import { motion } from "framer-motion";

const AnimatedCard = ({ children, animation, className }) => {
  return (
    <motion.div
      initial={animation.from}
      animate={animation.to}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
