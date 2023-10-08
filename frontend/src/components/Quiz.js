import { useState,useEffect } from "react";
export default function Quiz(props){
    const [data,setData] = useState([{}])
    const qna= {
        prompts:[]
    }



    useEffect(() =>{
        fetch("http://localhost:5000/quizpage").then(
        res => res.json()
        ).then(
        data =>{
            setData(data)
        }
        )
    },[])

    for(const key in data){
        qna.prompts.push(key+'?')
    }



    return(
        <div>
            {typeof qna.prompts==='undefined' ?(
                <p>Fetching Data...</p>
            ):(
                qna.prompts.map((prmpt,key)=>(
                    <p key={key}>{prmpt}</p>
                ))
            )}
        </div>
    )
}