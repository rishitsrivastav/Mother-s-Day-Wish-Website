import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeartButton from './components/HeartButton';
import FloralAnimation from './components/FloralAnimation';
import PetalParticles from './components/PetalParticles';
import AudioPlayer from './components/AudioPlayer';
import MessagePage from './components/MessagePage';
import GalleryPage from './components/GalleryPage';
import PoemPage from './components/PoemPage';
import FinalePage from './components/FinalePage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showPoem, setShowPoem] = useState(false);
  const [showFinale, setShowFinale] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleRestart = () => {
    setShowFinale(false);
    setShowPoem(false);
    setShowGallery(false);
    setShowMessage(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className={`relative z-10 ${showMessage || showGallery || showPoem || showFinale ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center px-4">
          <FloralAnimation />
          <PetalParticles />
          
          <div 
            className={`relative z-20 max-w-xl mx-auto text-center transition-opacity duration-1000 ease-in-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Header isLoaded={isLoaded} />
            
            <div 
              className={`mt-12 transition-all duration-1000 delay-500 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <HeartButton onClick={() => setShowMessage(true)} />
            </div>
          </div>

          <div className="absolute top-4 right-4 z-30">
            <AudioPlayer />
          </div>
        </div>
      </div>

      <MessagePage 
        isVisible={showMessage} 
        onGiftClick={() => {
          setShowMessage(false);
          setShowGallery(true);
        }}
      />
      <GalleryPage 
        isVisible={showGallery} 
        onContinue={() => {
          setShowGallery(false);
          setShowPoem(true);
        }}
      />
      <PoemPage
        isVisible={showPoem}
        onContinue={() => {
          setShowPoem(false);
          setShowFinale(true);
        }}
      />
      <FinalePage
        isVisible={showFinale}
        onRestart={handleRestart}
      />
    </div>
  );
}

export default App;