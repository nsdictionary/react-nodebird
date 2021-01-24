import { put, takeLatest, call, delay } from "redux-saga/effects";
import {
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
} from "../../store/constants";
import axios from "axios";
import { IPostState } from "../../reducers/post";

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

export interface IUnLikePostState {
  unlikePostLoading: boolean;
  unlikePostDone: boolean;
  unlikePostError: null | string;
}

const initialState = {
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
};

const actions = {
  [UNLIKE_POST_REQUEST]: (state: IPostState, action) => {
    state.unlikePostLoading = true;
    state.unlikePostDone = false;
    state.unlikePostError = null;
  },
  [UNLIKE_POST_SUCCESS]: (state: IPostState, action) => {
    const post: any = state.mainPosts.find((v) => v.id === action.data.PostId);
    post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
    state.unlikePostLoading = false;
    state.unlikePostDone = true;
  },
  [UNLIKE_POST_FAILURE]: (state: IPostState, action) => {
    state.unlikePostLoading = false;
    state.unlikePostError = action.error;
  },
};

export const useUnLikePostHandler = () => {
  return { initialState, actions };
};

export default function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
