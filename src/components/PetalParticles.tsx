import React, { useState, useEffect } from 'react';

// Create a type for our petals
interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

const PetalParticles = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  
  // Colors for the petals
  const petalColors = [
    'rgb(249, 168, 212)', // pink-300
    'rgb(252, 165, 165)', // red-300
    'rgb(216, 180, 254)', // purple-300
    'rgb(253, 186, 116)', // orange-300
  ];
  
  useEffect(() => {
    // Create initial petals
    const createPetals = () => {
      const newPetals: Petal[] = [];
      const petalCount = window.innerWidth < 768 ? 15 : 25;
      
      for (let i = 0; i < petalCount; i++) {
        newPetals.push(createPetal(i));
      }
      
      setPetals(newPetals);
    };
    
    // Create a single petal with random properties
    const createPetal = (id: number): Petal => {
      return {
        id,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.5 - window.innerHeight,
        size: 15 + Math.random() * 15,
        speed: 1 + Math.random() * 2,
        angle: Math.random() * 0.1 + 0.1, // Slightly angled movement
        rotation: Math.random() * 360, 
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: 0.6 + Math.random() * 0.4,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      };
    };
    
    // Animation frame for petal movement
    let animationFrameId: number;
    
    const animatePetals = () => {
      setPetals(prevPetals => 
        prevPetals.map(petal => {
          // Update position based on speed and angle
          const newY = petal.y + petal.speed;
          const newX = petal.x + Math.sin(petal.angle) * petal.speed;
          const newRotation = petal.rotation + petal.rotationSpeed;
          
          // Reset petal if it goes off screen
          if (newY > window.innerHeight) {
            return createPetal(petal.id);
          }
          
          return {
            ...petal,
            y: newY,
            x: newX,
            rotation: newRotation,
          };
        })
      );
      
      animationFrameId = requestAnimationFrame(animatePetals);
    };
    
    // Initialize petals and start animation
    createPetals();
    animationFrameId = requestAnimationFrame(animatePetals);
    
    // Handle window resize
    const handleResize = () => {
      createPetals();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute petal rounded-full"
          style={{
            left: `${petal.x}px`,
            top: `${petal.y}px`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.8}px`,
            opacity: petal.opacity,
            backgroundColor: petal.color,
            transform: `rotate(${petal.rotation}deg)`,
            borderRadius: '100% 0 55% 50% / 50% 0 100% 50%',
            transition: 'transform 0.5s ease',
          }}
        />
      ))}
    </div>
  );
};

export default PetalParticles;