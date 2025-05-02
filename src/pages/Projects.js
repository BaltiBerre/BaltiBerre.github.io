// src/pages/Projects.js
import React, { useState, useEffect, useRef } from 'react';
import projectsData from '../data/projectsData';
import styles from '../styles/ExpandableGrid.module.css';
import { ChevronDown, ExternalLink, X } from 'lucide-react';

export const Projects = () => {
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
      <h2 className={`${styles.sectionTitle} fade-in`}>My Projects</h2>
      
      {/* Projects Grid Container */}
      <div className={`${styles.gridContainer} ${styles.projectsGrid} fade-in`}>
        {projectsData.map((project, index) => (
          <div 
            key={index} 
            className={styles.card}
          >
            {/* Card Header - Always visible */}
            <div className={styles.cardHeader}>
              <h3>{project.title}</h3>
              <p className={styles.cardMeta}>{project.technologies}</p>
            </div>
            
            {/* Card Preview */}
            <div className={styles.cardPreview}>
              <p>{project.description.substring(0, 120)}...</p>
              
              <button 
                onClick={() => openModal(index)}
                className={styles.toggleButton}
                aria-expanded={expandedId === index}
                aria-controls={`modal-content-${index}`}
              >
                View Project <ChevronDown size={16} />
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
              <h3 id={`modal-title-${expandedId}`}>{projectsData[expandedId].title}</h3>
              <p className={styles.cardMeta}>{projectsData[expandedId].technologies}</p>
              
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
                  <p className={styles.fullDescription}>{projectsData[expandedId].description}</p>
                  
                  <h4>Project Management Highlights:</h4>
                  <ul>
                    {projectsData[expandedId].pmHighlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.contentSidebar}>
                  <div className={styles.contentSection}>
                    <h4>Skills:</h4>
                    <div className={styles.tags}>
                      {projectsData[expandedId].skills.map((skill, idx) => (
                        <span key={idx} className={styles.tag}>{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  {projectsData[expandedId].github && (
                    <div className={styles.cardActions}>
                      <a 
                        href={projectsData[expandedId].github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.githubButton}
                      >
                        View on GitHub <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
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

export default Projects;