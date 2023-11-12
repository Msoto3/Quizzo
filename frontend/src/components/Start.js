import React from "react"
export default function Start ({setStart,setDest}){
    return(
        <>
        <div id="leftBorder"> </div>
        <div id="rightBorder"> </div>
                <header>
            <h1>Quizzo</h1>
        </header>
        <h2>Select a category to begin quiz</h2>
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