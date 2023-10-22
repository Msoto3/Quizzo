import React from 'react';
import './index.css';
import Start from './components/Start';
import Quiz from './components/Quiz'; 
import { useState } from 'react';

function App() {
  const [start,setStart] = useState(false) // whether the website will be the front page or quiz page
  const [dest,setDest] = useState("") // this is the last part of the http that will be saved depending on the option clicked
  const [data, setData] = useState(null);// the data that is stored from the http request
  return (
    <div className="App">
      {!start && <Start setStart={setStart} start={start}  setDest={setDest} />}
      {start && <Quiz dest={dest} data={data} setData={setData}/>}
      
    </div>
  );
}

export default App;


