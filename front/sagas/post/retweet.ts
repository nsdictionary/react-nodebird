import { put, takeLatest, call, delay } from "redux-saga/effects";
import {
  RETWEET_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
} from "../../store/constants";
import axios from "axios";
import { IPostState } from "../../reducers/post";

function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}

export interface IRetweetState {
  retweetLoading: boolean;
  retweetDone: boolean;
  retweetError: null | string;
}

const initialState = {
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

const actions = {
  [RETWEET_REQUEST]: (state: IPostState, action) => {
    state.retweetLoading = true;
    state.retweetDone = false;
    state.retweetError = null;
  },
  [RETWEET_SUCCESS]: (state: IPostState, action) => {
    state.retweetLoading = false;
    state.retweetDone = true;
    state.mainPosts.unshift(action.data);
  },
  [RETWEET_FAILURE]: (state: IPostState, action) => {
    state.retweetLoading = false;
    state.retweetError = action.error;
  },
};

export const useRetweetHandler = () => {
  return { initialState, actions };
};

export default function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}
