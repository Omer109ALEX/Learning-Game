import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import InformationPage from './InformationPage';
import QuestionsPage from './QuestionsPage';
import SummaryPage from './SummaryPage';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);


  const resetQuiz = () => {
    setScore(0);
    setAnswers([]);
  };

  const handleNextQuestion = (isCorrect, explanation) => {
    setAnswers(prev => [...prev, { isCorrect, explanation }]);
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion < 10) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/information"
          element={<InformationPage
            currentQuestion={currentQuestion}
            handleNextQuestion={handleNextQuestion}
          />}
        />
        <Route
          path="/questions"
          element={<QuestionsPage
            currentQuestion={currentQuestion}
            handleNextQuestion={handleNextQuestion}
          />}
        />
        <Route
          path="/summary"
          element={<SummaryPage
            score={score}
            answers={answers}
            resetQuiz={resetQuiz}
          />}
        />
      </Routes>
    </Router>
  );
}

export default App;
