import React from 'react';

interface HeaderProps {
  isLoaded: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoaded }) => {
  return (
    <div className="text-center">
      <h1 
        className={`font-dancing text-5xl md:text-6xl lg:text-7xl text-pink-800 mb-6 transition-all duration-1500 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        Happy Mother's Day, Mom!
      </h1>
      
      <p 
        className={`text-purple-700 text-lg md:text-xl mb-8 transition-all duration-1500 delay-300 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        A celebration of love, gratitude, and beautiful memories
      </p>
    </div>
  );
};

export default Header;