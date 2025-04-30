import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  
  // Handle scroll-based navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const homeSection = document.getElementById('home');
      const experienceSection = document.getElementById('experience');
      const projectsSection = document.getElementById('projects');
      const contactSection = document.getElementById('contact');
      
      // Set activeSection based on scroll position
      if (scrollPosition < experienceSection.offsetTop - 100) {
        setActiveSection('home');
      } else if (scrollPosition < projectsSection.offsetTop - 100) {
        setActiveSection('experience');
      } else if (scrollPosition < contactSection.offsetTop - 100) {
        setActiveSection('projects');
      } else {
        setActiveSection('contact');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="content">
        <section id="home">
          <Home />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;