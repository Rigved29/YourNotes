import {Link, Route, useParams, useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import {quoteContext} from "../context/context";
import {useEffect, useContext} from "react";


// const Dummy_Quotes = [
//   {id:1,author:"Max",text:"Learning React is Fun"},
//   {id:2,author:"maximillian",text:"learning React is fun"},
// ]


const QuotesDetail = (props)=>{
const [ctxQ] = useContext(quoteContext);
console.log(props.uId);



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

console.log(localStorage.getItem("2"));



  useEffect(()=>{
  
    const getQuote = async ()=>{
  

      // if(){
      //   quote.uniqueId = props.Uid.name;
      // }

      console.log(quote);

    const response = await fetch(`https://react-router-eb1ed-default-rtdb.firebaseio.com/quotes/${props.uId.name}.json`)
    const data = await response.json();
    console.log(data);
    }





    getQuote();

  },[props.uId])



{/* <Switch>
<Route path="/quotes/:quoteId" exact>
<Redirect to="/quotes"/>
</Route>
</Switch> */}


if(!quote){
  return <h2>No quote Found</h2>
}


    return (
        <div>
         <HighlightedQuote text={quote.text} author={quote.author}/>
         <Route path={match.path} exact>
             
         <div className="centered">
         <Link to={`${match.url}/comments`} className="btn--flat">comments</Link>
         </div>

         </Route>
         
         
          <Route path={`${match.path}/comments`}>
                <Comments/>
                <p>Hello</p>
          </Route>
        </div>
    
    )
}

export default QuotesDetail;