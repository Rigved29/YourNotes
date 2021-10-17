import {Link, Route, useParams, useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import {quoteContext} from "../context/context";
import {useEffect, useContext,useState} from "react";
import { useHistory } from 'react-router-dom';


const QuotesDetail = (props)=>{
const [ctxQ] = useContext(quoteContext);
console.log(props.uId);
const [q,setQ] = useState({});

const history = useHistory();

console.log(ctxQ,"hello bhaiya");
 const quoteArr = Object.values(ctxQ.Quotes);
 
 console.log(quoteArr);

  const match = useRouteMatch();
  const params = useParams();
  console.log(typeof params.quoteId);

  console.log(match);
  console.log(quoteArr,params);

const quote = quoteArr.find(q=>q.id === Number(params.quoteId));
console.log(quote);


console.log(localStorage.getItem(params.quoteId));

const uniqueID = localStorage.getItem(params.quoteId);
console.log(uniqueID);


  useEffect(()=>{
  
    const getQuote = async()=>{

      console.log(quote,uniqueID);

    const response = await fetch(`https://react-router-eb1ed-default-rtdb.firebaseio.com/quotes/${uniqueID}.json`)
    const  data = await response.json();
    console.log(data);
    setQ(data);

    }


    getQuote();

  },[quote,uniqueID]);

const deleteNoteHandler =()=>{

  const deleteNote = async()=>{

    console.log(quote,uniqueID);

  const response = await fetch(`https://react-router-eb1ed-default-rtdb.firebaseio.com/quotes/${uniqueID}.json`,{
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
  })
  const  data = await response.json();


  }

  history.push("/quotes");

  deleteNote()
}

if(!quote){
  return <h2>No quote Found</h2>
}

console.log(q);

    return (
        <div>
         <HighlightedQuote text={quote.text} author={quote.author}/>
         <Route path={match.path} exact>
             
         <div className="left">
         <Link to={`${match.url}/comments`} className="btn--flat">Edit Your Note</Link>
         </div>


         </Route>
         
          <Route path={`${match.path}/comments`}>
                <Comments text={quote.text} author={quote.author} uID={uniqueID}/>
          </Route>

          <button onClick={deleteNoteHandler} className="centered">Delete</button>
        </div>
    
    )
}

export default QuotesDetail;