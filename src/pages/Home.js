// src/pages/Home.js
import React, { useEffect } from 'react';
import { Camera } from 'lucide-react';
import styles from '../styles/Home.module.css';


export const Home = () => {
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
  
  return (
    <div className={styles['home-container']}>
      <div className={styles.hero}>
        <div className={styles['hero-content']}>
          <div className={`${styles['hero-text']} slide-in-left`}>
            <h1>Baltasar Berretta</h1>
            <h2>Project Coordinator & CS Student</h2>
            <p className={styles['hero-bio']}>
              Born in Uruguay, raised in Brazil, and studying in the United States. 
              I'm passionate about technology, human behavior, and bringing structure 
              to creative processes. I specialize in coordinating projects, aligning teams, 
              and ensuring deliverables stay on track.
            </p>
            <div className={styles['hero-buttons']}>
              <a href="#experience" className="btn btn-primary">View My Experience</a>
              <a href="#contact" className="btn btn-outline">Contact Me</a>
            </div>
          </div>
          
          <div className={`${styles['hero-image']} slide-in-right`}>
            {/* Replace with actual image when you have one */}
            <div className={`${styles['hero-image']} slide-in-right`}>
            <img src="/images/Balti.jpeg" alt="Balti" className={styles['circular-image']} />
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};