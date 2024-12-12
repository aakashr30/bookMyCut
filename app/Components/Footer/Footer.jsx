import React from 'react';
import './footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Welcome to our website! We offer the best services for your styling and grooming needs. Quality and customer satisfaction are our top priorities.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p><strong>Address:</strong> 123 Styling St, Fashion City</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Email:</strong> info@example.com</p>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#facebook" className="facebook">Facebook</a>
            <a href="#twitter" className="twitter">Twitter</a>
            <a href="#instagram" className="instagram">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 YourCompany. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
