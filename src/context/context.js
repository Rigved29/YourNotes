import React from "react";
import {useState} from "react";

export const quoteContext = React.createContext();

const Dummy_Quotes= [
  {id:1,author:"Max",text:"Learning React is Fun",date: new Date('July 20, 2020')},
  {id:2,author:"maximillian",text:"learning React is fun",date: new Date('July 22, 2020')},
];


export const CounterContextProvider = props =>{
  const state = {
    Quotes:Dummy_Quotes,
  }
  const [q,setQ] = useState(state);
  const [initial,setInitial] = useState(true);

  const changeState =(d)=>{
    setQ(d);

  };

  
  return (
    <quoteContext.Provider value={[q,changeState,initial,setInitial]}>
      {props.children};
    </quoteContext.Provider>
  );
};
