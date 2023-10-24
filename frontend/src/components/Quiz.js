import React, { useEffect, useState } from "react";

export default function Quiz({ dest, data, setData }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
//   getting the data with the http request when the dest variable changes, ignore the terminal wanting more dependencies, it doesnt know what it wants
  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${dest}`);
        const data = await response.json();
        console.log(data)
        setData(data);
      } catch (error) {

        console.error("Error fetching data:", error);
      }
    };

    if (!data && dest) {
      fetcher();
    }
  }, [dest, data, setData]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const currentData = data[Object.keys(data)[currentQuestion]];
      const answers = [currentData.correct, ...currentData.incorrect];
      const shuffled = answers.sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
      setSelectedAnswer("");
    }
  }, [data, currentQuestion]);

  const handleSelection = (answer) => {
    setSelectedAnswer(answer);
  };
  // Function to handle moving to the next question
  const handleNext = () => {
    if (currentQuestion < Object.keys(data).length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowResult(false);
      setSelectedAnswer("");
      setSubmitted(false);
    }
  };

  // Function to handle the submission of the answe
  const handleSubmit = () => {
    const currentData = data[Object.keys(data)[currentQuestion]];
    const correctAnswer = currentData.correct;
    if (selectedAnswer === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
    setSubmitted(true);
  };

  return (
    <>
    <div id="leftBorder"> </div>
        <div id="rightBorder"> </div>
                <header>
            <h1>Quizzo</h1>
        </header>
    <div>
      {data ? (
        <div>
          <h2>{Object.keys(data)[currentQuestion]}</h2>
          {shuffledAnswers.map((answer, i) => (
            <div key={i}>
              <input
                type="radio"
                id={answer}
                name="answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => handleSelection(answer)}
              />
              <label htmlFor={answer}>{answer}</label>
            </div>
          ))}
          <br />
          {showResult && <p>{isCorrect ? "Correct!" : "Incorrect!"}</p>}
          {!showResult && !submitted && (
            <button onClick={handleSubmit}>Submit</button>
          )}
          {submitted && currentQuestion < Object.keys(data).length - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
    </>
  );
}