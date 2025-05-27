import React from 'react';

const Results = ({ name, isCorrect, correctAnswer, onRestart }) => {
  return (
    <div>
      <h2>{isCorrect ? `🎉 Great job, ${name}! You got it right!` : `😢 Sorry, ${name}. That's incorrect.`}</h2>
      {!isCorrect && (
        <p>
          The correct answer was: <strong dangerouslySetInnerHTML={{ __html: correctAnswer }} />
        </p>
      )}
      <button onClick={onRestart}>Try Another Question</button>
    </div>
  );
};

export default Results;