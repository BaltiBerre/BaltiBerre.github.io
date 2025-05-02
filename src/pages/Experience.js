// src/pages/Experience.js
import React, { useState, useEffect, useRef } from 'react';
import experienceData from '../data/experienceData';
import styles from '../styles/ExpandableGrid.module.css';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);
  const modalRef = useRef(null);
  const [modalAnimation, setModalAnimation] = useState('');
  
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
  
  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandedId !== null && modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    
    const handleEscape = (event) => {
      if (event.key === 'Escape' && expandedId !== null) {
        closeModal();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [expandedId]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (expandedId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [expandedId]);
  
  // Open modal with animation
  const openModal = (id) => {
    setExpandedId(id);
    setModalAnimation(styles.modalEnter);
    
    // Focus trap - move focus to modal for accessibility
    setTimeout(() => {
      modalRef.current?.focus();
    }, 100);
  };
  
  // Close modal with animation
  const closeModal = () => {
    setModalAnimation(styles.modalExit);
    
    // Delay state change to allow animation to complete
    setTimeout(() => {
      setExpandedId(null);
    }, 300); // Match with CSS transition duration
  };
  
  return (
    <div className={styles.sectionContainer}>
      <h2 className={`${styles.sectionTitle} fade-in`}>My Experience</h2>
      
      {/* Cards Grid/Flex Container */}
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
                onClick={() => openModal(index)}
                className={styles.toggleButton}
                aria-expanded={expandedId === index}
                aria-controls={`modal-content-${index}`}
              >
                View Details <ChevronDown size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal Overlay */}
      {expandedId !== null && (
        <div className={`${styles.modalOverlay} ${modalAnimation}`}>
          <div 
            className={styles.modalContent}
            ref={modalRef}
            tabIndex={-1}
            aria-labelledby={`modal-title-${expandedId}`}
          >
            <div className={styles.modalHeader}>
              <h3 id={`modal-title-${expandedId}`}>{experienceData[expandedId].title}</h3>
              <p className={styles.cardSubtitle}>{experienceData[expandedId].company}</p>
              <p className={styles.cardMeta}>{experienceData[expandedId].duration}</p>
              
              <button 
                className={styles.closeButton} 
                onClick={closeModal}
                aria-label="Close details"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
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
            
            <div className={styles.modalFooter}>
              <button 
                onClick={closeModal}
                className={styles.closeModalButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;  