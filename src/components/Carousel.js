// src/components/Carousel.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../styles/Carousel.module.css';

const Carousel = ({ 
  items, 
  renderItem, 
  autoPlay = false, 
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const length = items.length;
  
  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, interval);
    
    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);
  
  const handlePrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex < 0 ? length - 1 : newIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex >= length ? 0 : newIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToIndex = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  return (
    <div className={`${styles.carousel} ${className}`}>
      <div className={styles['carousel-content']}>
        {showArrows && (
          <button 
            className={`${styles['nav-button']} ${styles['prev-button']}`} 
            onClick={handlePrevious}
            aria-label="Previous item"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div className={styles['carousel-items-container']}>
          <div 
            className={`${styles['carousel-item']} ${isAnimating ? styles.animating : ''}`}
            key={currentIndex}
          >
            {renderItem(items[currentIndex], currentIndex)}
          </div>
        </div>
        
        {showArrows && (
          <button 
            className={`${styles['nav-button']} ${styles['next-button']}`} 
            onClick={handleNext}
            aria-label="Next item"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
      
      {showIndicators && items.length > 1 && (
        <div className={styles.indicators}>
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.indicator} ${idx === currentIndex ? styles.active : ''}`}
              onClick={() => goToIndex(idx)}
              aria-label={`Go to item ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;