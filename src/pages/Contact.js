import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import '../styles/Contact.module.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Since this is a portfolio site, we'll just simulate a successful submission
    // In a real application, you would send this data to a server
    setSubmitStatus('success');
    setTimeout(() => {
      setSubmitStatus(null);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 3000);
  };
  
  return (
    <div className="contact-container">
      <h2 className="section-title fade-in">Get In Touch</h2>
      
      <div className="contact-content">
        <div className="contact-info slide-in-left">
          <h3>Contact Information</h3>
          <p>Feel free to reach out if you're interested in my profile.</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <Mail size={20} />
              <a href="mailto:sberrettamagarinos25@wooster.edu">sberrettamagarinos25@wooster.edu</a>
            </div>
            <div className="contact-method">
              <Phone size={20} />
              <a href="tel:+19179369846">+1 917 936-9846</a>
            </div>
            <div className="contact-method">
              <a href="https://github.com/baltiberre" target="_blank" rel="noopener noreferrer">github.com/baltiberre</a>
            </div>
            <div className="contact-method">
              <MapPin size={20} />
              <span>Wooster, OH</span>
            </div>
          </div>
          
          <div className="availability-info">
            <h4>Availability</h4>
            <p>Available for full-time positions starting June 2025.</p>
            <p>Currently interested in project management roles related to marketing campaign coordination.</p>
          </div>
        </div>
        
        <div className="contact-form-container slide-in-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary submit-btn">
              Send Message
            </button>
            
            {submitStatus === 'success' && (
              <div className="submit-message success">
                Thanks for your message! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};