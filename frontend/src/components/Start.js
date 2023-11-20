import React, {useState} from "react"

export default function Start ({setStart,setDest}){
    const [userInput, setUserInput] = useState("");
    const handleInputChange = (event) => {
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
        <br/>
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

            <div className="grid-item" id="item7">
                Custom Prompt
                <input
                type="text"
                value={userInput}
                placeholder="Type Genre Here"
                style={{ marginRight: '10px' }}
                onChange={handleInputChange}
                />
                </div>
            <div onClick={userPrompt} className="grid-item" id="item8">
            </div>
            <div className="grid-item" id="item7">
            </div>
            </div>
        </div>
        </>
    )
}