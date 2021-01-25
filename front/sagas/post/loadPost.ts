import { put, call, delay, throttle, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
} from "../../store/constants";
import { IPostState } from "../../reducers/post";

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

export interface ILoadPostState {
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: null | string;
}

const initialState = {
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
};

const actions = {
  [LOAD_POST_REQUEST]: (state: IPostState, action) => {
    state.loadPostLoading = true;
    state.loadPostDone = false;
    state.loadPostError = null;
  },
  [LOAD_POST_SUCCESS]: (state: IPostState, action) => {
    state.loadPostLoading = false;
    state.loadPostDone = true;
    state.singlePost = action.data;
  },
  [LOAD_POST_FAILURE]: (state: IPostState, action) => {
    state.loadPostLoading = false;
    state.loadPostError = action.error;
  },
};

export const useLoadPostHandler = () => {
  return { initialState, actions };
};

export default function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
