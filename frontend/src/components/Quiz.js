import React, { useEffect, useState } from "react";

export default function Quiz({ data, setStart, setData, setDest }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (data && currentQuestion < Object.keys(data).length && Object.keys(data).length > 0) {
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

  const handleNext = () => {
    if (currentQuestion < Object.keys(data).length) {
      setCurrentQuestion((prev) => prev + 1);
      setShowResult(false);
      setSelectedAnswer("");
      setSubmitted(false);
      setShowHint(false);
    }

    //makes sure to reset the correct answer div for the next question
    const div = document.getElementById('correctAnswer')
    const parent = div.parentNode
    parent.removeChild(div)
  };

  const handleSubmit = () => {
    const currentData = data[Object.keys(data)[currentQuestion]];
    const correctAnswer = currentData.correct;
    if (selectedAnswer === correctAnswer) {
      setIsCorrect(true);
      setScore((count) => count + 1);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
    setSubmitted(true);
    setShowHint(false);

    handleCorrectAnswer(currentData.correct)

  };

  // creates a div to specifiy what the correct answer is
  const handleCorrectAnswer = (correct) =>{
      const div = document.createElement("div")
      div.innerHTML = `Correct Answer: ${correct}`
      div.id = "correctAnswer"
      div.style.color = "red"
      document.body.appendChild(div)

  }

  const ResetQuiz = () => {
    setData(null);
    setDest("");
    setStart(false);
  };

  const handleHint = () => {
    setShowHint(true);
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
          <div style={{ textAlign: "center" }}>
            <h2 className="h2 text-info font-weight-bold">{currentQuestion < Object.keys(data).length && Object.keys(data)[currentQuestion]}</h2>
            {currentQuestion < Object.keys(data).length &&
              shuffledAnswers.map((answer, i) => (
                <div className="container d-block shadow p-2 mb-3 bg-white rounded" style={{ width: '60%'}}>
                  <div key={i} className="form-check d-flex align-content-center mb-1 p-3 border rounded hover-effect ">
                    <input 
                      type="radio"
                      id={answer}
                      className="form-check-input"              
                      name="answer"
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={() => handleSelection(answer)}
                    />
                    <label id="rLabel" className={`form-check-label${answer===data[Object.keys(data)[currentQuestion]].correct?"-correct":""}`} htmlFor={answer}>{answer}</label>
                  </div>
                </div>
              ))}
            <br />
            {currentQuestion < Object.keys(data).length && showResult && <p>{isCorrect ? "Correct!" : "Incorrect!"}</p>}
            {currentQuestion < Object.keys(data).length && !showResult && !submitted && (
              <button className="btn btn-primary m-1" onClick={handleSubmit}>Submit</button>
            )}
            {submitted && currentQuestion < Object.keys(data).length && (
              <button className="quizButton" onClick={handleNext}>Next</button>
            )}
            {currentQuestion < Object.keys(data).length && !showHint && (
              <button className="btn btn-secondary m-1" onClick={handleHint}>Hint</button>
            )}
            {currentQuestion < Object.keys(data).length && showHint && <p>{data[Object.keys(data)[currentQuestion]].hint}</p>}
            {currentQuestion >= Object.keys(data).length && (
              <div className="results">
                <h1>Final Score: {(score / Object.keys(data).length) * 100}%</h1>
                <button className="quizButton" onClick={() => ResetQuiz()}>Main Menu</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>Generating Quiz...</div>
        )}
      </div>
    </>
  );
}
