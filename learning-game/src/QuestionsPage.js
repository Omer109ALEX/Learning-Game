import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import jumpingStars from './assets/jumping-stars.json'; // Path to your stars animation JSON
import errorAnimation from './assets/error.json'; // Path to your error animation JSON
import './QuestionsPage.css';

function QuestionsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState(state?.userAnswers || []);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const currentIndex = state?.currentIndex || 0;

  useEffect(() => {
    if (!state || !state.content || currentIndex >= state.content.length) {
      navigate('/summary', { state: { userAnswers } });
    }
  }, [state, currentIndex, navigate, userAnswers]);

  if (!state || !state.content || currentIndex >= state.content.length) {
    return null;
  }

  const { subject, content } = state;
  const currentContent = content[currentIndex];
  const { question, answers, correctAnswerIndex } = currentContent;

  const handleAnswer = (answerIndex) => {
    const isCorrect = answerIndex === correctAnswerIndex;
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    if (isCorrect) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }

    const newUserAnswers = [
      ...userAnswers,
      {
        questionIndex: currentIndex,
        userAnswer: answerIndex,
        isCorrect,
        explanation: isCorrect
          ? ''
          : `The correct answer was: ${answers[correctAnswerIndex]}. ${currentContent.explanation || ''}`
      }
    ];
    setUserAnswers(newUserAnswers);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    const nextIndex = currentIndex + 1;
    if (nextIndex < content.length) {
      navigate('/information', {
        state: {
          subject,
          content,
          currentIndex: nextIndex,
          userAnswers
        }
      });
    } else {
      navigate('/summary', { state: { userAnswers } });
    }
  };

  const handleLearnNewSubject = () => {
    navigate('/');  // This will take the user back to the homepage
  };

  return (
    <div className="questions-page">
      <div className="question-container">
        <h3 className="sub-subject-heading">{currentContent.subSubject}</h3>
        <h2 className="question-text">{question}</h2>
        <div className="answers-grid">
          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswer(index)}
              className={`answer-option ${
                showFeedback
                  ? index === correctAnswerIndex
                    ? 'correct'
                    : index === selectedAnswer
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              disabled={showFeedback}
            >
              {answer}
            </button>
          ))}
        </div>
        {showFeedback && (
          <div className={`feedback ${selectedAnswer === correctAnswerIndex ? 'correct' : 'incorrect'}`}>
            <h3>{selectedAnswer === correctAnswerIndex ? 'Correct!' : 'Incorrect'}</h3>
            <p>{currentContent.explanation || ''}</p>
            <button className="next-button" onClick={handleNextQuestion}>
              Next Question
            </button>
          </div>
        )}
        <div className="question-counter">
          <p>Question {currentIndex + 1} of {content.length}</p>
        </div>
      </div>

      {/* Lottie Animations */}
      {showCelebration && (
        <div className="celebration">
          <Lottie animationData={jumpingStars} className="lottie-animation" />
        </div>
      )}

      {showFeedback && selectedAnswer !== correctAnswerIndex && (
        <div className="error-animation">
          <Lottie animationData={errorAnimation} className="lottie-animation" />
        </div>
      )}

      <button onClick={handleLearnNewSubject} className="learn-new-subject-button">
        Learn New Subject
      </button>
    </div>
  );
}

export default QuestionsPage;
