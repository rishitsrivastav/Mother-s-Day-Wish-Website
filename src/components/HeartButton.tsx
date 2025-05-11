import React, { useState } from 'react';

interface HeartButtonProps {
  onClick: () => void;
}

const HeartButton: React.FC<HeartButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      className={`heart-button relative px-8 py-4 text-white font-medium text-lg rounded-full
        bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg
        transform transition-all duration-300 
        ${isHovered ? 'scale-110 shadow-pink-300/50' : 'scale-100'}
        animate-pulse-slow`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">Click to Begin Your Journey</span>
      
      {/* Heart shape overlay */}
      <span 
        className={`absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 
          opacity-0 transition-opacity duration-300 rounded-full
          ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
        aria-hidden="true"
      />
      
      {/* Glow effect on hover */}
      <span 
        className={`absolute -inset-3 bg-pink-500/20 rounded-full blur-xl 
          transform transition-all duration-300
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
        aria-hidden="true"
      />
    </button>
  );
};

export default HeartButton;