// src/pages/Experience.js
import React, { useState, useEffect, useRef } from 'react';
import experienceData from '../data/experienceData';
import styles from '../styles/ExpandableGrid.module.css';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);
  const overlayRef = useRef(null);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  // Handle click outside to close overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandedId !== null && overlayRef.current && !overlayRef.current.contains(event.target)) {
        setExpandedId(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedId]);
  
  // Toggle expanded state
  const toggleCard = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className={styles.sectionContainer}>
      <h2 className={`${styles.sectionTitle} fade-in`}>My Experience</h2>
      
      <div className={`${styles.gridContainer} fade-in`}>
        {experienceData.map((exp, index) => (
          <div 
            key={index} 
            className={styles.card}
          >
            {/* Card Header - Always visible */}
            <div className={styles.cardHeader}>
              <h3>{exp.title}</h3>
              <p className={styles.cardSubtitle}>{exp.company}</p>
              <p className={styles.cardMeta}>{exp.duration}</p>
            </div>
            
            {/* Card Preview */}
            <div className={styles.cardPreview}>
              <p>{exp.responsibilities[0].substring(0, 100)}...</p>
              
              <button 
                onClick={() => toggleCard(index)}
                className={styles.toggleButton}
                aria-expanded={expandedId === index}
                aria-controls={`content-${index}`}
              >
                Show Details <ChevronDown size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Overlay for expanded content */}
      {expandedId !== null && (
        <div className={styles.overlay} ref={overlayRef}>
          <div className={styles.overlayCard}>
            <div className={styles.overlayHeader}>
              <h3>{experienceData[expandedId].title}</h3>
              <p className={styles.cardSubtitle}>{experienceData[expandedId].company}</p>
              <p className={styles.cardMeta}>{experienceData[expandedId].duration}</p>
              <button 
                onClick={() => setExpandedId(null)}
                className={styles.closeButton}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.overlayContent}>
              <div className={styles.expandedFlexContainer}>
                <div className={styles.contentSection}>
                  <h4>Responsibilities:</h4>
                  <ul>
                    {experienceData[expandedId].responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.contentSidebar}>
                  <div className={styles.contentSection}>
                    <h4>Skills:</h4>
                    <div className={styles.tags}>
                      {experienceData[expandedId].skills.map((skill, idx) => (
                        <span key={idx} className={styles.tag}>{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.contentSection}>
                    <h4>Key Achievements:</h4>
                    <ul>
                      {experienceData[expandedId].achievements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;

