import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function InformationPage({ currentQuestion, handleNextQuestion }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { subject } = state || {}; // Provide a default empty object if state is null
  const [generatedContent, setGeneratedContent] = useState(null);

  useEffect(() => {
    if (!subject) {
      // If subject is missing, redirect to home page
      navigate('/');
      return;
    }

    const fetchContent = async () => {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject }),
      });

      const data = await response.json();
      setGeneratedContent(data);
    };

    fetchContent();
  }, [subject, navigate]);

  const goToQuestions = () => {
    navigate('/questions', { state: { ...generatedContent } });
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      {generatedContent ? (
        <>
          <p>{generatedContent.paragraph}</p>
          <button onClick={goToQuestions} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Proceed to Questions
          </button>
          <div style={{ marginTop: '20px' }}>
            <p>{currentQuestion} / 10</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InformationPage;
