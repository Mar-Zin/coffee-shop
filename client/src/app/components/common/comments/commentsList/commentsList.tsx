import React from "react";
import { ICommentItem } from "../../../../../models";
import Comment from "../comment/comment";
import style from "./index.module.scss";

interface CommentsListProps {
  comments:ICommentItem[]
  onRemove:Function
}

const CommentsList = ({ comments, onRemove }:CommentsListProps) => {
  return (
    <div className={style.postList}>
   
      {comments.map((comment) => (
      
        <Comment key={comment._id} {...comment} onRemove={onRemove} />
       
      ))}
     
    </div>
  );
};

export default CommentsList;
