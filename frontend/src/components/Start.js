import React from "react"
export default function Start ({setStart,setDest}){
    return(
        <>
                <header>
            <h1>Quizzo</h1>
        </header>

        <div className="center-container"> 
            <div className="grid-container">
            {/* Row 1 */}
            <div onClick={()=>{setDest("science");setStart(true)}} className="grid-item" id="item1">
                Science
            </div>
            <div className="grid-item" id="item2">
                Option 2
            </div>
            <div className="grid-item" id="item3">
                Option 3
            </div>

            {/* Row 2 */}
            <div className="grid-item" id="item4">
                Option 4
            </div>
            <div className="grid-item" id="item5">
                Option 5
            </div>
            <div className="grid-item" id="item6">
                Option 6
            </div>
            </div>
        </div>
        </>
    )
}