import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc = "/assets/mothers-day-music.mp3" }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create an audio element
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    
    // Set properties
    audio.loop = true;
    audio.volume = 0.3;
    
    // Event listeners
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      // Attempt to play (may be blocked by browser autoplay policies)
      audio.play().catch(() => {
        // If autoplay is blocked, we'll let the user click to play
        setIsMuted(true);
      });
    });
    
    // Cleanup
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <button
      onClick={toggleMute}
      className={`flex items-center justify-center w-12 h-12 rounded-full 
        bg-white/40 backdrop-blur-sm text-pink-700 transition-all duration-300
        hover:bg-white/60 hover:shadow-md
        ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      aria-label={isMuted ? "Unmute music" : "Mute music"}
      title={isMuted ? "Unmute music" : "Mute music"}
    >
      {isMuted ? 
        <VolumeX size={24} /> : 
        <Volume2 size={24} />
      }
    </button>
  );
};

export default AudioPlayer;