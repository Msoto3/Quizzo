import React from 'react';
import './index.css';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import { useState } from 'react';

function App() {
  const [start,setStart] = useState(false)
  return (
    <div className="App">
      {!start && <Menu setStart={setStart} start={start} />}
      {start && <Quiz />}
      
    </div>
  );
}

export default App;


