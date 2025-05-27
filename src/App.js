import React, { useState } from 'react';
import Home from './components/Home';
import QuestionForm from './components/QuestionForm';
import Results from './components/Results';

function App() {
  const [userSettings, setUserSettings] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [fetchError, setFetchError] = useState('');

  const fetchQuestion = async (settings) => {
    const proxy = "https://corsproxy.io/?";
    const url = `${proxy}https://opentdb.com/api.php?amount=1&type=multiple&category=${settings.category}&difficulty=${settings.difficulty}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Fetch result:", data);

      if (data.response_code === 0 && data.results.length > 0) {
        setQuestionData(data.results[0]);
        setFetchError('');
      } else {
        // Try fallback
        const fallback = `${proxy}https://opentdb.com/api.php?amount=1&type=multiple&category=9&difficulty=easy`;
        const fallbackRes = await fetch(fallback);
        const fallbackData = await fallbackRes.json();
        if (fallbackData.results.length > 0) {
          setQuestionData(fallbackData.results[0]);
          setFetchError('');
        } else {
          setFetchError('No questions available even with fallback.');
        }
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      setFetchError('Failed to fetch question. Please try again.');
    }
  };

  const startQuiz = (settings) => {
    setUserSettings(settings);
    setAnswerResult(null);
    setQuestionData(null);
    fetchQuestion(settings);
  };

  const handleAnswerSubmit = (isCorrect, correctAnswer) => {
    setAnswerResult({ isCorrect, correctAnswer });
  };

  const restartQuiz = () => {
    setUserSettings(null);
    setQuestionData(null);
    setAnswerResult(null);
    setFetchError('');
  };

  // UI Rendering
  if (!userSettings) return <Home onStartQuiz={startQuiz} />;
  if (fetchError) return <p style={{ color: 'red' }}>{fetchError}</p>;
  if (!questionData) return <p>Loading question...</p>;
  if (!answerResult)
    return <QuestionForm question={questionData} onSubmitAnswer={handleAnswerSubmit} />;
  return (
    <Results
      name={userSettings.name}
      isCorrect={answerResult.isCorrect}
      correctAnswer={answerResult.correctAnswer}
      onRestart={restartQuiz}
    />
  );
}

export default App;