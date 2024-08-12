import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import './HomePage.css';
import scienceLoverAnimation from './assets/science-lover.json';  // Left-side animation
import bookAnimation from './assets/book.json';  // Right-side animation

function HomePage() {
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = () => {
    if (subject.trim() === '') return;

    navigate('/information', { state: { subject } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="homepage-container">
      <div className="background-overlay">
        <Lottie animationData={scienceLoverAnimation} className="learning-animation-left" />
        <div className="content">
          <h1 className="homepage-title">What do you want to learn today?</h1>
          <div className="input-container">
            <input
              type="text"
              value={subject}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter a topic"
              className="homepage-input"
            />
            <button onClick={handleSubmit} className="homepage-button">
              Submit
            </button>
          </div>
        </div>
        <Lottie animationData={bookAnimation} className="learning-animation-right" />
      </div>
    </div>
  );
}

export default HomePage;
