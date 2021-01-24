import { put, takeLatest, call, delay } from "redux-saga/effects";
import {
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "../../store/constants";
import axios from "axios";
import { IPostState } from "../../reducers/post";

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

export interface ILikePostState {
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: null | string;
}

const initialState = {
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
};

const actions = {
  [LIKE_POST_REQUEST]: (state: IPostState, action) => {
    state.likePostLoading = true;
    state.likePostDone = false;
    state.likePostError = null;
  },
  [LIKE_POST_SUCCESS]: (state: IPostState, action) => {
    const post: any = state.mainPosts.find((v) => v.id === action.data.PostId);
    post.Likers.push({ id: action.data.UserId });
    state.likePostLoading = false;
    state.likePostDone = true;
  },
  [LIKE_POST_FAILURE]: (state: IPostState, action) => {
    state.likePostLoading = false;
    state.likePostError = action.error;
  },
};

export const useLikePostHandler = () => {
  return { initialState, actions };
};

export default function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
