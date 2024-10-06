import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SummaryPage.css';

function SummaryPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state || !state.userAnswers) {
    navigate('/');
    return null;
  }

  const { userAnswers } = state;
  const totalQuestions = userAnswers.length;
  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;

  const handleLearnNewSubject = () => {
    navigate('/');  // This will take the user back to the homepage
  };

  return (
    <div className="summary-page-container">
      <div className="summary-page">
        <h1 className="summary-title">Quiz Summary</h1>
        <div className="results">
          <p>Correct Answers: <span className="correct">{correctAnswers}</span></p>
          <p>Incorrect Answers: <span className="incorrect">{totalQuestions - correctAnswers}</span></p>
        </div>
        <button onClick={handleLearnNewSubject} className="learn-new-subject-button">
          Learn New Subject
        </button>
      </div>
    </div>
  );
}

export default SummaryPage;
