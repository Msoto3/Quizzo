import React, {useState} from "react"

export default function Start ({setStart,setDest}){
    const [userInput, setUserInput] = useState("");
    const handleInputChange = (event) => {
        // Update the ref with the current value of the input
        setUserInput(event.target.value);
    };
    const userPrompt = () => {
        setDest(userInput);
        setStart(true);
    }
    
    return(
        <>
        <div id="leftBorder"> </div>
        <div id="rightBorder"> </div>
                <header>
            <h1>Quizzo</h1>
        </header>
        <h2><strong>Select a category to begin quiz</strong></h2>
        <h2><strong>OR</strong></h2>
        <div id="InputDiv">     
            <input
                type="text"
                value={userInput}
                id="UserInput"
                placeholder="Input a category to begin Quiz"
                onChange={handleInputChange}
            />
            <label htmlFor="UserInput" onClick={userPrompt} id="InputButton">Start</label>
        </div>
        
        <div className="center-container"> 
            <div className="grid-container">
            {/* Row 1 */}
            <div onClick={()=>{setDest("science");setStart(true)}} className="grid-item" id="item1">
                Science
            </div>
            <div onClick={()=>{setDest("math");setStart(true)}} className="grid-item" id="item2">
                Math
            </div>
            <div onClick={()=>{setDest("sports");setStart(true)}} className="grid-item" id="item3">
                Sports
            </div>

            {/* Row 2 */}
            <div onClick={()=>{setDest("popculture");setStart(true)}} className="grid-item" id="item4">
                Pop Culture
            </div>
            <div onClick={()=>{setDest("history");setStart(true)}} className="grid-item" id="item5">
                History
            </div>
            <div onClick={()=>{setDest("animals");setStart(true)}} className="grid-item" id="item6">
                Animals
            </div>
            </div>
        </div>
        </>
    )
}