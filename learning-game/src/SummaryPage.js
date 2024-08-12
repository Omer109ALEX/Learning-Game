import React from 'react';
import { useNavigate } from 'react-router-dom';

function SummaryPage({ score, answers, resetQuiz }) {
  const navigate = useNavigate();

  const wrongAnswers = answers.filter(answer => !answer.isCorrect);

  const handleLearnNewSubject = () => {
    resetQuiz();  // Reset the score and answers
    navigate('/');  // Navigate back to the homepage
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Quiz Summary</h2>
      <p>You answered {score} questions right and {10 - score} wrong.</p>
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        {wrongAnswers.length > 0 ? (
          <div>
            <h3>Explanation for Wrong Answers:</h3>
            <ul>
              {wrongAnswers.map((answer, index) => (
                <li key={index}>
                  {answer.explanation}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Great job! You got all the answers right.</p>
        )}
      </div>
      <button onClick={handleLearnNewSubject} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Learn New Subject
      </button>
    </div>
  );
}

export default SummaryPage;
