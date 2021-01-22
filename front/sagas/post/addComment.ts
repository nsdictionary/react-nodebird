import { put, takeLatest, call, delay } from "redux-saga/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
} from "../../store/constants";
import axios from "axios";
import { IPostState } from "../../reducers/post";
import shortId from "shortid";

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 2,
    nickname: "제로초",
  },
});

export const addCommentInitialState = {
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export interface IAddCommentState {
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: null | string;
}

export const addCommentHandler = {
  [ADD_COMMENT_REQUEST]: (state: IPostState, action) => {
    state.addCommentLoading = true;
    state.addCommentDone = false;
    state.addCommentError = null;
  },
  [ADD_COMMENT_SUCCESS]: (state: IPostState, action) => {
    const post = state.mainPosts.find((v) => v.id === action.data.postId);
    post.Comments.unshift(dummyComment(action.data.content));
    state.addCommentLoading = false;
    state.addCommentDone = true;
  },
  [ADD_COMMENT_FAILURE]: (state: IPostState, action) => {
    state.addCommentLoading = false;
    state.addCommentError = action.error;
  },
};

export default function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
