import React, { useState, useEffect } from 'react';
import './index.css';
import Start from './components/Start';
import Quiz from './components/Quiz';
import NumberofQuestions from './components/NumberofQuestions';

function App() {
  const [start, setStart] = useState(false);
  const [dest, setDest] = useState('');
  const [data, setData] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [showNumberofQuestions, setShowNumberofQuestions] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      try {
        let url = `https://quizzo-bisg.onrender.com/${dest}`;
        if (questionCount > 0) {
          url = `https://quizzo-bisg.onrender.com/${dest}/${questionCount}`;
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (dest) {
      fetcher();
    }
  }, [dest, questionCount]);

  const handleStartQuiz = () => {
    setShowNumberofQuestions(true);
  };

  const goToQuiz = () => {
    setShowNumberofQuestions(false);
    setStart(true);
  };

  return (
    <div className="App">
      {!start && !showNumberofQuestions && (
        <Start setDest={setDest} setStart={handleStartQuiz} />
      )}
      {!start && showNumberofQuestions && (
        <NumberofQuestions setQuestionCount={setQuestionCount} goToQuiz={goToQuiz} />
      )}
      {start && <Quiz data={data} setStart={setStart} setData={setData} setDest={setDest} />}
    </div>
  );
}

export default App;
