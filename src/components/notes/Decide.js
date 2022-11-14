import React from "react";

const Decide = (props) =>{
    
    if(props.initial){
        return <h1>Create Your First Note😀😀</h1>
    }
    else{
        return <h1>No Notes Found</h1>
    }
    
}

export default Decide;