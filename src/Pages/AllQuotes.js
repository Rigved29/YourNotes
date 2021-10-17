import QuoteList from "../components/quotes/QuoteList";
import { useEffect,useState } from "react";
import {quoteContext} from "../context/context";
import { useContext } from "react";
import Loader from "../components/UI/LoadingSpinner";


const AllQuotes = ()=>{
    console.log(quoteContext);
    const [ctxQ,ChangeStateCtxQ,initial,changeInitial] = useContext(quoteContext);
    const [allQuotes,setAllQuotes] = useState([]);
    const [error,setError] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    


    useEffect(()=>{
        
        const getQuotes = async()=>{
            setIsLoading(true);
            try{
                const response = await fetch("https://react-router-eb1ed-default-rtdb.firebaseio.com/quotes.json");
                

                const data = await response.json();

                console.log(data);
                setIsLoading(false);
                let dataArr,arr;
               if(response.ok){
                dataArr = Object.values(data);
                arr = [...dataArr]; 
                setAllQuotes(arr);
               }
                else if(!response.ok){
                   throw new Error("Sorry not stable internet connection")
                   
                }
                
            
               const uniqueArr = [...new Set(arr)];


            if(initial){
              
                ChangeStateCtxQ({
                    Quotes:uniqueArr,  
                });

                changeInitial(false);

            }
          
        }catch(err){
            setIsLoading(false);
            console.log(`I think your internet is not working: ${err}`)
            setError(true);
        }
    }
     
    getQuotes();

        
        const date = new Date('July 20, 2020');
        console.log(date,"time:",date.getTime(),"day:",date.getDate(),"year:",date.getFullYear());
        console.log(date.toLocaleDateString());

    },[]);

    return <div>
          {!error && !isLoading && allQuotes.length!==0 && <QuoteList quotes={allQuotes}/>}  {/*initial?allQuotes:ctxQ.Quotes*/}
          {error && !isLoading && allQuotes.length===0 && <h1>No Notes Found!! Check Your Internet Connection😌😌</h1>}
          {!error && isLoading && allQuotes.length===0 && <Loader/>}
        </div>
}

export default AllQuotes;