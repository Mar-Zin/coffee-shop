import { INewCommentItem, IState } from './../../models';
import { createAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { ICommentItem } from "../../models";
import commentService from "../services/comment.service";

export interface CommentsState {
    entities: ICommentItem[],
    error: string,
    isLoading: boolean,
}
const initialState: CommentsState = {
    entities: [],
    error: '',
    isLoading: true,
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentCreatedFailed: (state, action) => {
      state.error = action.payload;
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      );
    },
    commentRemovedFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");

const { actions, reducer: commentsReducer } = commentsSlice;
const {
  commentsRequested,
  commentsReceved,
  commentsRequestFailed,
  commentCreated,
  commentCreatedFailed,
  commentRemoved,
  commentRemovedFailed,
} = actions;

export const loadCommentsList = (userId:string|undefined) => async (dispatch:Dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error as Error));
  }
};

export const createComment = (payload: INewCommentItem) => async (dispatch:Dispatch) => {
  dispatch(commentCreateRequested());

  try {
    const { content } = await commentService.createComment(payload);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentCreatedFailed(error as Error));
  }
};

export const removeComment = (id:string) => async (dispatch:Dispatch) => {
  dispatch(commentRemoveRequested());
  try {
    const { content } = await commentService.removeComment(id);
    if (!content) {
      dispatch(commentRemoved(id));
    }
  } catch (error) {
    dispatch(commentRemovedFailed(error as Error));
  }
};

export const getComments = () => (state:IState) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state:IState) =>
  state.comments.isLoading;

export default commentsReducer;
