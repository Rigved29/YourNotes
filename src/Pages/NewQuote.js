import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from 'react-router-dom';
import {quoteContext} from "../context/context";
import { useContext } from "react";
// import useHttp from "../customhooks/usehttp";

const NewQuotes = (props)=>{

 const [ctxQ] = useContext(quoteContext);

 console.log(ctxQ,"dekho");

    const history = useHistory();

    const postdata = async(d,uId)=>{
        const response = await fetch("https://react-router-eb1ed-default-rtdb.firebaseio.com/quotes.json",{
            method:"POST",
            body:JSON.stringify(d),
        });
        const data = await response.json();

        console.log(data);

        props.sndUniqueData(data,uId);
    }

    const addQuoteHandler = (quoteData) =>{

        console.log(quoteData);
        postdata(quoteData,quoteData.id);

        history.push("/quotes");
    }


    return <QuoteForm onAddQuote={addQuoteHandler} />
}

export default NewQuotes;