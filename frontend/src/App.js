import React, { useEffect } from 'react';
import './index.css';
import Start from './components/Start';
import Quiz from './components/Quiz'; 
import { useState } from 'react';

function App() {
  const [start,setStart] = useState(false) // whether the website will be the front page or quiz page
  const [dest,setDest] = useState("") // this is the last part of the http that will be saved depending on the option clicked
  const [data, setData] = useState(null);
  
  useEffect(()=>{
    const fetcher = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${dest}`);
        const data = await response.json();
        console.log(data)
        setData(data);
      } catch (error) {
  
        console.error("Error fetching data:", error);
      }
    };

    if(dest)
      fetcher()

  },[start,setData,dest])
  
  return (
    <div className="App">
      {!start && <Start setDest={setDest} setStart={setStart}/>}
      {start && <Quiz data={data} setStart={setStart} setData={setData} setDest={setDest} />}
      
    </div>
  );
}

export default App;


