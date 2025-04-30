// src/pages/Projects.js
import React, { useState, useEffect, useRef } from 'react';
import projectsData from '../data/projectsData';
import styles from '../styles/ExpandableGrid.module.css';
import { ChevronDown, ExternalLink, X } from 'lucide-react';

export const Projects = () => {
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
      <h2 className={`${styles.sectionTitle} fade-in`}>My Projects</h2>
      
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
                onClick={() => toggleCard(index)}
                className={styles.toggleButton}
                aria-expanded={expandedId === index}
                aria-controls={`project-content-${index}`}
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
              <h3>{projectsData[expandedId].title}</h3>
              <p className={styles.cardMeta}>{projectsData[expandedId].technologies}</p>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
