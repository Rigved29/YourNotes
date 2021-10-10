import {Route,Switch,Redirect} from "react-router-dom";
import AllQuotes from "./Pages/AllQuotes";
import NewQuotes from "./Pages/NewQuote";
import QuotesDetail from "./Pages/QuoteDetail";
import Layout from "./components/layout/Layout";
import NotFound from "./Pages/NotFound";
import {CounterContextProvider,quoteContext} from "./context/context";
import { useContext, useState } from "react";

function App() {

const [uniqueId,setUniqueId] = useState("");

const [v] = useContext(quoteContext.Quotes);
  

//  const Dummy_Quotes = [
//     {id:"q1",author:"Max",text:"Learning React is Fun"},
//     {id:"q2",author:"maximillian",text:"learning React is fun"},
//   ]

const getUniqueData = (d) =>{
   console.log(d,"aageya kya");
   setUniqueId(d);
  localStorage.setItem("2",d.name);
}
console.log(typeof uniqueId);

  return (
    
<Layout>
<CounterContextProvider>

<Switch>
      <Route path="/" exact>
        <Redirect to="/quotes"/>
      </Route>
      <Route path="/quotes" exact >
         <AllQuotes/>
      </Route>
      <Route path="/quotes/:quoteId">
         <QuotesDetail uId={uniqueId} />
      </Route>
      <Route path="/new-quote">
         <NewQuotes sndUniqueData={getUniqueData}/>
      </Route>
      <Route path="*">
         <NotFound/>   {/* Not found page should always come in last of Switch  */}
      </Route>
  </Switch>

</CounterContextProvider>
  
</Layout>
    

  
    
  );
}

export default App;
