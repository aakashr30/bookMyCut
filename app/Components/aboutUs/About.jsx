import React from 'react';
import './about.css';

function About() {
  return (
    <div className="about">
      <div className="about-intro">
        <h1>About Us</h1>
        <p>
          We are a dedicated team committed to providing the best hair and beauty services. With a focus on customer satisfaction and quality, we strive to make every visit a memorable experience.
        </p>
      </div>
      
      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to offer top-notch grooming services with a personal touch. We aim to empower confidence and style, delivering personalized experiences to each of our valued clients.
        </p>
      </div>
      
      {/* <div className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" />
            <h3>Jane Doe</h3>
            <p>Lead Stylist</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" />
            <h3>John Smith</h3>
            <p>Color Specialist</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" />
            <h3>Emily White</h3>
            <p>Makeup Artist</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default About;
