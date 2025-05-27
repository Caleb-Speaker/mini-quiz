import React, { useState } from 'react';

const Home = ({ onStartQuiz }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, difficulty } = formData;
    if (!name || !category || !difficulty) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    onStartQuiz(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>🧠 Mini Quiz App</h1>
      <p>Enter your name, select a category and difficulty, and start the quiz!</p>

      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />

      <label>Category:</label>
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select category</option>
        <option value="9">General Knowledge</option>
        <option value="21">Sports</option>
        <option value="23">History</option>
        <option value="17">Science & Nature</option>
      </select>

      <label>Difficulty:</label>
      <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
        <option value="">Select difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={!formData.name || !formData.category || !formData.difficulty}>
        Start Quiz
      </button>
    </form>
  );
};

export default Home;