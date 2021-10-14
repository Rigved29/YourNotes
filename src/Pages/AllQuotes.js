import QuoteList from "../components/quotes/QuoteList";
// import useHttp from '../customhooks/usehttp';
import { useEffect,useState } from "react";
import {quoteContext} from "../context/context";
import { useContext } from "react";

const Dummy_Q = [
    {id:1,author:"Max",text:"Learning React is Fun",date: new Date('July 20, 2020')},
    {id:2,author:"maximillian",text:"learning React is fun",date: new Date('July 22, 2020')},
];

const AllQuotes = ()=>{
    console.log(quoteContext);
    const [ctxQ,ChangeStateCtxQ,initial,changeInitial] = useContext(quoteContext);
    const [allQuotes,setAllQuotes] = useState(Dummy_Q);
    


    useEffect(()=>{
        
        const getQuotes = async()=>{

            
                const response = await fetch("https://react-router-eb1ed-default-rtdb.firebaseio.com/quotes.json");

                const data = await response.json();

                console.log(data);

               const dataArr = Object.values(data);
                
                console.log(data,dataArr , "data,dataArr");
            let arr;
// ...(ctxQ.Quotes),
               arr = [...dataArr];       
            
               console.log(arr,"arr");
               console.log(dataArr,"dataArr");
               console.log(ctxQ,"ctxQ");

               const uniqueArr = [...new Set(arr)];

               console.log(uniqueArr,"unique");
               console.log(JSON.stringify(uniqueArr[2])===JSON.stringify(uniqueArr[7]),"btaao");

            if(initial){
              
                ChangeStateCtxQ({
                    Quotes:uniqueArr,  
                });

                changeInitial(false);

            }
                

            

            

                console.log(ctxQ.Quotes,initial,"hello");
          
            setAllQuotes(prevQuotes=>{
                return [...prevQuotes,...dataArr];
            })
           
              
        
            
        }

        getQuotes();
        const date = new Date('July 20, 2020');
        console.log(date,"time:",date.getTime(),"day:",date.getDate(),"year:",date.getFullYear());
        console.log(date.toLocaleDateString());

    },[]);

    console.log(allQuotes,"allQuotes");
    return <QuoteList quotes={initial?allQuotes:ctxQ.Quotes}/>
}

export default AllQuotes;