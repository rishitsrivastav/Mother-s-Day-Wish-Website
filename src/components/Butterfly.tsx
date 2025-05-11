import React from 'react';
import { motion } from 'framer-motion';

interface ButterflyProps {
  onComplete: () => void;
}

const Butterfly: React.FC<ButterflyProps> = ({ onComplete }) => {
  const startX = -50;
  const startY = Math.random() * window.innerHeight;
  
  const endX = window.innerWidth + 50;
  const endY = startY + (Math.random() * 200 - 100);

  return (
    <motion.div
      className="absolute"
      initial={{ x: startX, y: startY, scale: 0 }}
      animate={{
        x: endX,
        y: [startY, endY, startY],
        scale: 1,
        rotateY: [0, 180, 0, 180, 0],
      }}
      transition={{
        duration: 10,
        times: [0, 0.5, 1],
        rotateY: {
          repeat: Infinity,
          duration: 0.5,
        },
      }}
      onAnimationComplete={onComplete}
    >
      <div className="text-pink-400 transform -translate-y-1/2">
        🦋
      </div>
    </motion.div>
  );
};

export default Butterfly;