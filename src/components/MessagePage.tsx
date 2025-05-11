import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Flower } from 'lucide-react';
import Butterfly from './Butterfly';
import TypewriterText from './TypewriterText';

interface MessagePageProps {
  isVisible: boolean;
  onGiftClick: () => void;
}

const MessagePage: React.FC<MessagePageProps> = ({ isVisible, onGiftClick }) => {
  const [butterflies, setButterflies] = useState<number[]>([]);
  const [flowers, setFlowers] = useState<number[]>([]);

  useEffect(() => {
    // Butterfly animation
    const butterflyInterval = setInterval(() => {
      setButterflies(prev => {
        const newButterflies = [...prev];
        if (newButterflies.length < 8) {
          newButterflies.push(Date.now());
        }
        return newButterflies;
      });
    }, 2000);

    // Flower animation
    const flowerInterval = setInterval(() => {
      setFlowers(prev => {
        const newFlowers = [...prev];
        if (newFlowers.length < 12) {
          newFlowers.push(Date.now());
        }
        return newFlowers;
      });
    }, 1500);

    return () => {
      clearInterval(butterflyInterval);
      clearInterval(flowerInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 1, type: 'spring', damping: 20 }}
          className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-100 overflow-hidden z-20"
          style={{ perspective: '1000px' }}
        >
          {/* Animated background flowers */}
          {flowers.map((id, index) => (
            <motion.div
              key={id}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
                rotate: 0,
                scale: 0,
              }}
              animate={{
                y: -50,
                rotate: 360,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 15,
                ease: "linear",
                times: [0, 0.5, 1],
              }}
              onAnimationComplete={() => {
                setFlowers(prev => prev.filter(f => f !== id));
              }}
            >
              <Flower
                size={24 + Math.random() * 24}
                className={`${
                  index % 3 === 0 ? 'text-pink-300' :
                  index % 3 === 1 ? 'text-purple-300' : 'text-rose-300'
                }`}
              />
            </motion.div>
          ))}

          {/* Watercolor flowers background */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <img
                key={i}
                src="https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg"
                alt=""
                className="absolute w-64 h-64 object-cover rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>

          {/* Message frame */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100"
            >
              <div className="absolute inset-0 rounded-2xl border-8 border-double border-pink-200 m-2" />
              
              {/* Decorative corners */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 text-pink-300"
                  style={{
                    top: i < 2 ? '-1rem' : 'auto',
                    bottom: i >= 2 ? '-1rem' : 'auto',
                    left: i % 2 === 0 ? '-1rem' : 'auto',
                    right: i % 2 === 1 ? '-1rem' : 'auto',
                    transform: `rotate(${i * 90}deg)`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [`${i * 90}deg`, `${i * 90 + 10}deg`, `${i * 90}deg`],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ❀
                </motion.div>
              ))}
              
              <TypewriterText
                text="Mom, thank you for your endless love and support. You make every day brighter with your smile."
                className="text-2xl text-pink-800 font-dancing text-center relative z-10"
              />
            </motion.div>
          </div>

          {/* Butterflies */}
          {butterflies.map(id => (
            <Butterfly key={id} onComplete={() => {
              setButterflies(prev => prev.filter(b => b !== id));
            }} />
          ))}

          {/* Gift button */}
          <motion.button
            onClick={onGiftClick}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 
                     bg-gradient-to-r from-pink-400 to-purple-400 text-white
                     px-8 py-4 rounded-xl shadow-lg flex items-center gap-2
                     hover:shadow-pink-300/50 transition-shadow"
            whileHover={{ scale: 1.05 }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <Gift className="w-6 h-6" />
            <span className="font-medium">Open Your Gift</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessagePage;