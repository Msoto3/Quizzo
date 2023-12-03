import React, { useEffect, useState } from "react";

export default function Quiz({ data, setStart, setData, setDest }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score,setScore] = useState(0)
  const [showHint, setShowHint] = useState(false);
  

  useEffect(() => {
    
    if (data && currentQuestion<Object.keys(data).length-1 && Object.keys(data).length > 0) {
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
    if (currentQuestion <= Object.keys(data).length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowResult(false);
      setSelectedAnswer("");
      setSubmitted(false);
      setShowHint(false); 
    }
    
  };

  // Function to handle the submission of the answer
  const handleSubmit = () => {
    const currentData = data[Object.keys(data)[currentQuestion]];
    const correctAnswer = currentData.correct;
    if (selectedAnswer === correctAnswer) {
      setIsCorrect(true);
      setScore((count)=>count+1)
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
    setSubmitted(true);
    setShowHint(false);
  };

  // when the user is done with the quiz runs this function to reset all settings
  const ResetQuiz = () =>{
      setData(null)
      setDest("")
      setStart(false)
      
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
        <div style={{textAlign:"center"}}> 
          <h2>{currentQuestion <= Object.keys(data).length - 1 && Object.keys(data)[currentQuestion]}</h2>
          {currentQuestion <= Object.keys(data).length - 1 && shuffledAnswers.map((answer, i) => (
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
          {currentQuestion <= Object.keys(data).length - 1 && showResult && <p>{isCorrect ? "Correct!" : "Incorrect!"}</p>}
          {currentQuestion <= Object.keys(data).length - 1 && !showResult && !submitted && (
            <button className="quizButton" onClick={handleSubmit}>Submit</button>
          )}
          {submitted && currentQuestion <= Object.keys(data).length - 1 && (
            <button className="quizButton"  onClick={handleNext}>Next</button>
          )}
          {currentQuestion <= Object.keys(data).length - 1 && !showHint && (<button className="quizButton" onClick={handleHint}>Hint</button>)}
          {currentQuestion <= Object.keys(data).length - 1 && showHint && <p>{data[Object.keys(data)[currentQuestion]].hint}</p>}
          {currentQuestion > Object.keys(data).length-1 &&(
            <div className="results">
              <h1>Final Score: {(score/Object.keys(data).length)*100}%</h1>
              <button className="quizButton" onClick={()=>ResetQuiz()}>Main Menu</button>
            </div>
            
          )}
        </div>
      ) : (
        <div style={{textAlign:"center"}}>Generating Quiz...</div>
      )}
    </div>
    </>
  );
}