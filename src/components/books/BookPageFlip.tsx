
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface BookPageFlipProps {
  pages: string[];
}

const BookPageFlip: React.FC<BookPageFlipProps> = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const totalPages = pages.length;
  
  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !flipping) {
      setDirection('next');
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(prevPage => prevPage + 1);
        setTimeout(() => {
          setFlipping(false);
        }, 500);
      }, 250);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0 && !flipping) {
      setDirection('prev');
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(prevPage => prevPage - 1);
        setTimeout(() => {
          setFlipping(false);
        }, 500);
      }, 250);
    }
  };
  
  // For keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToPrevPage(); // In RTL, right arrow goes to previous page
      } else if (e.key === 'ArrowLeft') {
        goToNextPage(); // In RTL, left arrow goes to next page
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, flipping]);
  
  return (
    <div className="relative mx-auto" ref={containerRef}>
      <div 
        className="w-full aspect-[3/4] relative overflow-hidden rounded-lg shadow-lg bg-gray-50"
        style={{ perspective: '1500px' }}
      >
        {/* Current Page */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-700 ${
            flipping && direction === 'next' 
              ? 'animate-[page-flip-out_0.7s_ease-in-out_forwards]' 
              : flipping && direction === 'prev'
              ? 'animate-[page-flip-in_0.7s_ease-in-out_forwards]'
              : ''
          }`}
          style={{ 
            transformOrigin: direction === 'next' ? 'left center' : 'right center',
            backfaceVisibility: 'hidden',
            zIndex: flipping ? 20 : 10
          }}
        >
          <img 
            src={pages[currentPage]} 
            alt={`صفحة ${currentPage + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-lg text-sm font-medium">
            {currentPage + 1} / {totalPages}
          </div>
        </div>
        
        {/* Next Page (for animation) */}
        {currentPage < totalPages - 1 && (
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-700 ${
              flipping && direction === 'next' 
                ? 'animate-[page-flip-in_0.7s_ease-in-out_forwards]'
                : 'opacity-0'
            }`}
            style={{ 
              transformOrigin: 'left center',
              backfaceVisibility: 'hidden',
              zIndex: flipping && direction === 'next' ? 10 : 5
            }}
          >
            <img 
              src={pages[currentPage + 1]} 
              alt={`صفحة ${currentPage + 2}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Previous Page (for animation) */}
        {currentPage > 0 && (
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-700 ${
              flipping && direction === 'prev' 
                ? 'animate-[page-flip-out_0.7s_ease-in-out_reverse_forwards]' 
                : 'opacity-0'
            }`}
            style={{
              transformOrigin: 'right center',
              backfaceVisibility: 'hidden',
              zIndex: flipping && direction === 'prev' ? 10 : 5
            }}
          >
            <img 
              src={pages[currentPage - 1]} 
              alt={`صفحة ${currentPage}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between pointer-events-none z-30">
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 0 || flipping}
          className={`pointer-events-auto h-10 w-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-700 hover:text-ali-blue transition-all ${
            currentPage === 0 || flipping ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
          }`}
          style={{ transform: 'translateX(-50%)' }}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <button 
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1 || flipping}
          className={`pointer-events-auto h-10 w-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-700 hover:text-ali-blue transition-all ${
            currentPage === totalPages - 1 || flipping ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
          }`}
          style={{ transform: 'translateX(50%)' }}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default BookPageFlip;
