
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animationType?: 'fade-in' | 'scale-in' | 'fade-in-right' | 'fade-in-left';
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'none';
}

const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0,
  animationType = 'fade-in',
  hoverEffect = 'lift',
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-visible');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  const hoverClasses = {
    lift: 'hover:-translate-y-2 hover:shadow-card-hover',
    scale: 'hover:scale-105',
    glow: 'hover:shadow-lg hover:shadow-primary/20',
    none: '',
  };
  
  const animationClasses = {
    'fade-in': 'animate-on-scroll',
    'scale-in': 'animate-on-scroll opacity-0 scale-95',
    'fade-in-right': 'animate-on-scroll translate-x-8',
    'fade-in-left': 'animate-on-scroll -translate-x-8',
  };
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 bg-white shadow-card',
        animationClasses[animationType],
        hoverEffect !== 'none' && hoverClasses[hoverEffect],
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
