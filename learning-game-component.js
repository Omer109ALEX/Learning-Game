import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';

const LearningGame = () => {
  const [topic, setTopic] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = async (topic) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates educational content." },
          { role: "user", content: `Generate 10 questions about ${topic}. For each question, provide a short piece of information, the question itself, 4 possible answers, and the correct answer. Format the output as a JSON array.` }
        ],
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });

      const generatedContent = JSON.parse(response.data.choices[0].message.content);
      setGameData(generatedContent);
      setGameStarted(true);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('שגיאה ביצירת התוכן. אנא נסה שוב.');
    }
    setIsLoading(false);
  };


  const startGame = () => {
    if (topic) {
      generateContent(topic);
    } else {
      alert("אנא הכנס נושא.");
    }
  };

  const handleAnswer = (selectedAnswer) => {
    const correct = selectedAnswer === gameData[currentQuestion].correctAnswer;
    setScore(correct ? score + 1 : score);
    setFeedback(correct ? "נכון!" : "לא נכון. התשובה הנכונה היא: " + gameData[currentQuestion].correctAnswer);

    setTimeout(() => {
      setFeedback("");
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  if (isLoading) {
    return <Card><CardContent>טוען...</CardContent></Card>;
  }

  if (!gameStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>באיזה נושא תרצה ללמוד היום?</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="הכנס נושא"
          />
          <Button onClick={startGame}>התחל</Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>תוצאות המשחק</CardTitle>
        </CardHeader>
        <CardContent>
          <p>ענית נכון על {score} שאלות מתוך 10.</p>
          <Button onClick={() => {
            setGameStarted(false);
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
            setGameData(null);
          }}>שחק שוב</Button>
        </CardContent>
      </Card>
    );
  }

  const currentData = gameData[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{topic}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{currentData.info}</p>
        <h3>{currentData.question}</h3>
        {currentData.options.map((option, index) => (
          <Button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </Button>
        ))}
        {feedback && <p>{feedback}</p>}
      </CardContent>
    </Card>
  );
};

export default LearningGame;

Versi

