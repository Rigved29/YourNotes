import { useState } from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
 console.log(props.uID);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  return (
    <section className={classes.comments}>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Edit
        </button>
      )}
      {isAddingComment && <NewCommentForm text={props.text} author={props.author} uID={props.uID}/>}
   
    </section>
  );
};

export default Comments;
