import {useEffect} from "react";

const useHttp =(stats,qData)=>{
  
useEffect(()=>{

     const getQuotes = async () =>{
         const response = await fetch(`https://animechan.vercel.app/api/random`);
         const data = await response.json();

         console.log(data,"yes");



     }

     const postQuotes = async (qData) =>{
        const response = await fetch("https://react-router-eb1ed-default-rtdb.firebaseio.com/react.json",{method:"POST",
         body:JSON.stringify(qData),
         });
        const data = await response.json();

        console.log(data);



    }
    
if(stats==="get"){
    getQuotes();
}
else if(stats==="post"){
    postQuotes();
}
     

  },[]);

    return 
}

export default useHttp;