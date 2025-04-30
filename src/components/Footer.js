// src/components/Footer.js
import React from 'react';
import { Mail } from 'lucide-react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-top']}>
          <div className={styles['footer-logo']}>
            <span>Baltasar Berretta</span>
          </div>
          
          <div className={styles['footer-social']}>
            <a href="https://github.com/baltiberre" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            </a>
            <a href="mailto:sberrettamagarinos25@wooster.edu" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            </a>
          </div>
        </div>
        
        <div className={styles['footer-bottom']}>
          <p className={styles.copyright}>
            &copy; {year} Baltasar Berretta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;