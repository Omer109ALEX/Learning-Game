import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import './HomePage.css';
import scienceLoverAnimation from './assets/science-lover.json';  // Left-side animation
import bookAnimation from './assets/book.json';  // Right-side animation
import loadingAnimation from './assets/loading.json';  // New loading animation

function HomePage() {
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //const response = await fetch('http://localhost:5001/initialize_subject', {
      const response = await fetch('https://learning-game-backend.onrender.com/initialize_subject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received data:', JSON.stringify(data, null, 2));

      // Log the received data
      console.log('Received data:', data);

      if (response.ok) {
        navigate('/information', { 
          state: { 
            subject: data.subject,
            content: data.content,
            currentIndex: 0
          } 
        });
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="homepage-container">
      <div className="background-overlay">
        <Lottie animationData={scienceLoverAnimation} className="learning-animation-left" />
        <div className="content">
          <h1 className="homepage-title">What do you want to learn today?</h1>
          <form onSubmit={handleSubmit} className="input-container">
            <input
              type="text"
              value={subject}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter a topic"
              className="homepage-input"
            />
            <button type="submit" className="homepage-button" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </form>
          {isLoading && (
            <div className="loading-container">
              <Lottie animationData={loadingAnimation} loop={true} />
            </div>
          )}
        </div>
        <Lottie animationData={bookAnimation} className="learning-animation-right" />
      </div>
    </div>
  );
}

export default HomePage;
