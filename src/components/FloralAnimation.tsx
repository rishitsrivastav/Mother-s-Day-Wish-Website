import React from 'react';
import { Flower } from 'lucide-react';

const FloralAnimation = () => {
  // Create an array of flowers with different positions and animations
  const flowers = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    x: Math.random() * 100, // Random x position (0-100%)
    y: Math.random() * 100, // Random y position (0-100%)
    size: 24 + Math.random() * 48, // Random size (24-72px)
    color: index % 3 === 0 ? 'text-pink-300' : 
           index % 3 === 1 ? 'text-purple-300' : 'text-rose-300',
    delay: index * 0.4, // Staggered delay for each flower
    duration: 3 + Math.random() * 5, // Random duration (3-8s)
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {flowers.map((flower) => (
        <div 
          key={flower.id}
          className={`absolute ${flower.color} opacity-40 floral-bloom`}
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
          }}
        >
          <Flower size={flower.size} strokeWidth={1.5} />
        </div>
      ))}
    </div>
  );
};

export default FloralAnimation;