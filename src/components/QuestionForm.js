import React, { useState, useEffect } from 'react';

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const QuestionForm = ({ question, onSubmitAnswer }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    if (question) {
      const allAnswers = shuffleArray([...question.incorrect_answers, question.correct_answer]);
      setShuffledAnswers(allAnswers);
    }
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setError("Please select an answer.");
      return;
    }
    const isCorrect = selected === question.correct_answer;
    onSubmitAnswer(isCorrect, question.correct_answer);
  };

  if (!question) return <p>Loading question...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      {shuffledAnswers.map((answer, i) => (
        <div key={i}>
          <input
            type="radio"
            id={`answer-${i}`}
            name="answer"
            value={answer}
            checked={selected === answer}
            onChange={(e) => setSelected(e.target.value)}
          />
          <label htmlFor={`answer-${i}`} dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      ))}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default QuestionForm;