import React from 'react';
import './index.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Quizzo</h1>
      </header>

      <div className="center-container"> 
        <div className="grid-container">
          {/* Row 1 */}
          <div className="grid-item" id="item1">
            Option 1
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
    </div>
  );
}

export default App;


