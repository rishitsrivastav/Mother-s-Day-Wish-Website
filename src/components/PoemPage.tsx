import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Feather } from 'lucide-react';

interface PoemPageProps {
  isVisible: boolean;
  onContinue: () => void;
}

const verses = [
  {
    text: "तेरी ममता की छाँव में\nमैंने जीना सीखा है\nतेरी लोरी की धुन पर\nसपने बुनना सीखा है",
    translation: "In the shade of your love\nI learned to live\nOn the melody of your lullaby\nI learned to dream"
  },
  {
    text: "हर मुश्किल में साथ दिया\nहर ख़ुशी में मुस्कुराई\nतूने सिखाया जीवन का पाठ\nतूने दी हर सुख की परछाई",
    translation: "You stood by me in every difficulty\nSmiled in every joy\nYou taught me life's lessons\nYou gave me every comfort's shade"
  },
  {
    text: "तेरे आँचल की खुशबू में\nमिली मुझे हर खुशियाँ\nतेरी दुआओं के साये में\nमिटी सारी परेशानियाँ",
    translation: "In the fragrance of your care\nI found all happiness\nUnder the shadow of your blessings\nAll worries disappeared"
  },
  {
    text: "माँ तू है मेरी जीवन रेखा\nतू है मेरी पहचान\nतेरे बिना अधूरा हूँ मैं\nतू है मेरी जान ❤️",
    translation: "Mother, you are my lifeline\nYou are my identity\nI am incomplete without you\nYou are my life ❤️"
  }
];

const PoemPage: React.FC<PoemPageProps> = ({ isVisible, onContinue }) => {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showSeal, setShowSeal] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const sparkleIdRef = React.useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    sparkleIdRef.current += 1;
    const newSparkle = {
      id: sparkleIdRef.current,
      x: clientX,
      y: clientY,
    };
    
    setSparkles(prev => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1000);
  };

  const handlePrevVerse = () => {
    if (currentVerse > 0) {
      setCurrentVerse(prev => prev - 1);
      setShowSeal(false);
    }
  };

  const handleNextVerse = () => {
    if (currentVerse < verses.length - 1) {
      setCurrentVerse(prev => prev + 1);
    } else {
      setShowSeal(true);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 overflow-hidden z-40"
          onMouseMove={handleMouseMove}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
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
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              >
                {i % 3 === 0 ? (
                  <Heart className="text-pink-200/30" size={24} fill="rgba(255, 182, 193, 0.2)" />
                ) : i % 3 === 1 ? (
                  <Star className="text-purple-200/30" size={24} fill="rgba(216, 180, 254, 0.2)" />
                ) : (
                  <Sparkles className="text-yellow-200/30" size={24} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Sparkles on mouse move */}
          {sparkles.map(sparkle => (
            <motion.div
              key={sparkle.id}
              className="absolute w-2 h-2"
              style={{ left: sparkle.x, top: sparkle.y }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Sparkles className="text-yellow-400" size={16} />
            </motion.div>
          ))}

          {/* Main content container */}
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <motion.div
              className="relative w-[900px] aspect-[4/3] bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 rounded-2xl shadow-2xl p-1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              {/* Glass morphism effect */}
              <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl" />

              {/* Content container */}
              <div className="relative w-full h-full bg-white/90 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-3.png')] opacity-30" />

                {/* Decorative border */}
                <div className="absolute inset-6 border-4 border-double border-pink-800/20 rounded-xl" />

                {/* Main content */}
                <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                  >
                    {/* Verse container */}
                    <motion.div
                      key={`verse-${currentVerse}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative"
                    >
                      {/* Hindi verse */}
                      <motion.p
                        className="font-dancing text-4xl text-rose-900 whitespace-pre-line mb-6 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {verses[currentVerse].text}
                      </motion.p>

                      {/* Translation toggle button */}
                      <motion.button
                        onClick={() => setShowTranslation(!showTranslation)}
                        className="text-sm text-pink-600 hover:text-pink-700 transition-colors mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        {showTranslation ? "Hide Translation" : "Show Translation"}
                      </motion.button>

                      {/* English translation */}
                      <AnimatePresence>
                        {showTranslation && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-lg text-purple-700 italic mb-8"
                          >
                            {verses[currentVerse].translation}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Decorative elements */}
                      <motion.div
                        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-rose-300 via-pink-500 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: 128 }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </motion.div>

                    {/* Navigation buttons */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-16 flex items-center justify-center gap-8"
                    >
                      {currentVerse > 0 && (
                        <motion.button
                          onClick={handlePrevVerse}
                          className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 
                                   text-white rounded-xl shadow-lg overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            <Heart 
                              size={20} 
                              className="group-hover:scale-125 transition-transform" 
                              fill="white"
                            />
                            <span className="font-dancing text-xl">Previous</span>
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      )}

                      {!showSeal ? (
                        <motion.button
                          onClick={handleNextVerse}
                          className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 
                                   text-white rounded-xl shadow-lg overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            <span className="font-dancing text-xl">Next</span>
                            <Heart 
                              size={20} 
                              className="group-hover:scale-125 transition-transform" 
                              fill="white"
                            />
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={onContinue}
                          className="relative"
                          whileHover={{ scale: 1.1 }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 via-purple-500 to-rose-500 
                                        rounded-full flex items-center justify-center shadow-lg 
                                        hover:shadow-pink-300/50 transition-all duration-300 group
                                        relative overflow-hidden">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500"
                              animate={{
                                rotate: [0, 360],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                            <Feather className="w-12 h-12 text-white relative z-10 group-hover:rotate-12 
                                              transition-transform" />
                          </div>
                          <motion.div
                            className="absolute -inset-4 bg-pink-500/20 rounded-full blur-lg"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.button>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PoemPage;