import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function QuestionsPage({ currentQuestion, handleNextQuestion }) {
  const { state } = useLocation();
  const { question, answers, correctAnswerIndex } = state;
  const navigate = useNavigate();

  const handleAnswer = (index) => {
    const isCorrect = index === correctAnswerIndex;
    const explanation = isCorrect ? '' : `The correct answer was ${answers[correctAnswerIndex]}.`;

    handleNextQuestion(isCorrect, explanation);

    if (currentQuestion < 10) {
      navigate('/information', { state: { subject: 'Your Subject Here' } });
    } else {
      navigate('/summary');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>{question}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '600px', margin: 'auto' }}>
        {answers.map((answer, index) => (
          <div
            key={index}
            onClick={() => handleAnswer(index)}
            style={{
              border: '2px solid #ccc',
              padding: '20px',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100px'
            }}>
            {answer}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>{currentQuestion} / 10</p>
      </div>
    </div>
  );
}

export default QuestionsPage;
