import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Music, Gift } from 'lucide-react';

interface FinalePageProps {
  isVisible: boolean;
  onRestart: () => void;
}

const FinalePage: React.FC<FinalePageProps> = ({ isVisible, onRestart }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 overflow-hidden"
        >
          {/* Floating hearts background */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
                scale: 0.5 + Math.random() * 0.5,
              }}
              animate={{
                y: -100,
                x: `calc(${Math.random() * 100}vw)`,
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <Heart className="text-pink-300" size={24} fill="rgba(244, 114, 182, 0.3)" />
            </motion.div>
          ))}

          {/* Sparkles and stars */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {i % 2 === 0 ? (
                <Sparkles className="text-yellow-400" size={16} />
              ) : (
                <Star className="text-purple-400" size={16} fill="rgba(192, 132, 252, 0.3)" />
              )}
            </motion.div>
          ))}

          {/* Main content */}
          <div className="relative h-full flex flex-col items-center justify-center px-4">
            {/* Celebration icons */}
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 flex gap-8"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Music className="text-purple-500 w-12 h-12" />
              </motion.div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <Gift className="text-pink-500 w-12 h-12" />
              </motion.div>
            </motion.div>

            {/* Main celebration image */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.5,
              }}
              className="mb-12 relative"
            >
              <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl 
                            border-8 border-white/50 backdrop-blur-sm">
                <img
                  src="/assets/11.jpg"
                  alt="Celebration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent" />
              </div>
              
              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-4 border-dashed border-pink-300"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Thank you message */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <motion.h1
                className="text-7xl font-dancing text-pink-600 mb-6"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Thank You Maa
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="relative"
              >
                <h2 className="text-4xl font-dancing text-purple-600 mb-8">
                  For Being The Best Mother In The World
                </h2>

                <p className="text-2xl text-pink-700 font-dancing mt-4">
                  Your love makes every day special ❤️
                </p>

                {/* Decorative line */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 
                            bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"
                  initial={{ width: 0 }}
                  animate={{ width: 128 }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </motion.div>
            </motion.div>

            {/* Restart button */}
            <motion.button
              onClick={onRestart}
              className="absolute bottom-8 right-8 p-6 bg-white/10 backdrop-blur-sm rounded-full
                        hover:bg-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart 
                className="w-8 h-8 text-pink-600 group-hover:scale-125 transition-transform" 
                fill="#ec4899"
              />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FinalePage;