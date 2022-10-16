import { useEffect } from "react";
import { orderBy } from "lodash";
import CommentsList from "../common/comments/commentsList/commentsList";
import {  useSelector } from "react-redux";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from "../../store/comments";
import { useParams } from "react-router-dom";
import AddCommentForm from "../common/comments/addCommentForm/addCommentForm";
import { useAppDispatch } from "./hooks/redux";
import { getIsLoggedIn } from "../../store/users";

const Comments = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn())
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());
  useEffect(() => {
    dispatch(loadCommentsList(id));
  }, [id]);

  const handleSubmit = (data:any) => {
    dispatch(createComment({ ...data, pageId: id }));
  };

  const handleRemoveComment = (id:string) => {
    dispatch(removeComment(id));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
  return (
    <>
      {sortedComments.length > 0 && (
        <>
          {!isLoading ? (
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          ) : (
            "loading"
          )}
        </>
      )}
      <hr />
      {isLoggedIn?<AddCommentForm onSubmit={handleSubmit} />:null}
    </>
  );
};

export default Comments;
