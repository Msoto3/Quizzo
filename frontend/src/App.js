import React from 'react';
import './index.css';
import Start from './components/Start';
import Quiz from './components/Quiz'; 
import { useState } from 'react';

function App() {
  const [start,setStart] = useState(false) // whether the website will be the front page or quiz page
  const [dest,setDest] = useState("") // this is the last part of the http that will be saved depending on the option clicked
  return (
    <div className="App">
      {!start && <Start setStart={setStart} start={start}  setDest={setDest} />}
      {start && <Quiz dest={dest}/>}
      
    </div>
  );
}

export default App;


