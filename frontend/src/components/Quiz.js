import { useEffect } from "react";
export default function Quiz({dest,data,setData}) {
  
//   getting the data with the http request when the dest variable changes, ignore the terminal wanting more dependencies, it doesnt know what it wants
  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${dest}`);
        const data = await response.json();
        setData(data);
      } catch (error) {

        console.error("Error fetching data:", error);
      }
    };
  
    if (!data && dest) {
      fetcher();
    }
  }, [dest]);

  return (
    <div>
      {data ? (
        // mapping the keys made from the data and getting the questions and answers
        Object.keys(data).map((question, index) => (
          <div key={index}>
            <h2>{question}</h2>
            <p>{data[question].correct}</p>
            {data[question].incorrect.map((answer, i) => (
              <p key={i}>{answer}</p>
            ))}
            <br />
          </div>
        ))
      ) : (
        // this loads while waiting for the http request to get the data
        <div>Loading...</div>
      )}
    </div>
  );
}
