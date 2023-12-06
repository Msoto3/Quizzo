import React, { useState } from "react";

export default function NumberofQuestions({ setQuestionCount, goToQuiz }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleStartQuiz = () => {
    // Convert the input value to a number and pass it to the parent component
    const questionCount = parseInt(inputValue);
    if (!isNaN(questionCount) && questionCount > 0) {
      setQuestionCount(questionCount);
      goToQuiz();
    } else {
      // Handle invalid input or display an error message
      console.error("Please enter a valid number of questions.");
    }
  };

  return (
    <>
      <div id="leftBorder"> </div>
      <div id="rightBorder"> </div>
      <header>
        <h1>Quizzo</h1>
      </header>
      <div className="center-container">
        <div className="number-of-questions ">
          <h2>Set Number of Questions:</h2>
          <input
            type="number"
            value={inputValue}
            placeholder="Enter number of questions"
            onChange={handleInputChange}
          />
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      </div>
    </>
  );
}
