import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './InformationPage.css';

function InformationPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { subject, content, currentIndex = 0 } = state || {};

  console.log('InformationPage state:', state);

  if (!subject || !content || !Array.isArray(content) || content.length === 0) {
    console.error('Invalid state in InformationPage:', state);
    navigate('/');
    return null;
  }

  if (currentIndex >= content.length) {
    navigate('/summary');
    return null;
  }

  const currentContent = content[currentIndex];

  const goToQuestions = () => {
    console.log('Navigating to questions with state:', { ...state, currentIndex });
    navigate('/questions', { 
      state: { 
        ...state,
        currentIndex  // Don't increment here, just pass the current index
      } 
    });
  };

  const handleLearnNewSubject = () => {
    navigate('/');  // This will take the user back to the homepage
  };

  // Debugging info (commented out)
  /*
  const debuggingInfo = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'red',
      color: 'white',
      padding: '10px',
      zIndex: 9999,
      fontSize: '16px',
      fontWeight: 'bold'
    }}>
      DEBUG: Information Page<br />
      Current Index: {currentIndex}<br />
      Sub-subject: {currentContent.subSubject}<br />
      Total Content: {content.length}
    </div>
  );
  */

  return (
    <div className="information-page">
      {/* {debuggingInfo} */}
      <div className="content-box">
        <h2 className="subject-heading">{subject}</h2>
        <h3 className="sub-subject-heading">{currentContent.subSubject}</h3>
        <p className="content-paragraph">{currentContent.paragraph}</p>
        <button onClick={goToQuestions} className="proceed-button">
          Proceed to Question
        </button>
        <div className="question-counter">
          <p>Sub-subject {currentIndex + 1} of {content.length}</p>
        </div>
      </div>
      <button onClick={handleLearnNewSubject} className="learn-new-subject-button">
        Learn New Subject
      </button>
    </div>
  );
}

export default InformationPage;
