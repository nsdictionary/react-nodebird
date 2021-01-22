import { put, call, delay, throttle } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
} from "../../store/constants";
import { generateDummyPost, IPostState } from "../../reducers/post";

function loadPostsAPI(data) {
  return axios.get("/api/posts", data);
}

function* loadPosts(action) {
  try {
    // const result = yield call(loadPostsAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

export interface ILoadPostState {
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: null | string;
}

const initialState = {
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
};

const actions = {
  [LOAD_POSTS_REQUEST]: (state: IPostState, action) => {
    state.loadPostsLoading = true;
    state.loadPostsDone = false;
    state.loadPostsError = null;
  },
  [LOAD_POSTS_SUCCESS]: (state: IPostState, action) => {
    state.loadPostsLoading = false;
    state.loadPostsDone = true;
    state.mainPosts = action.data.concat(state.mainPosts);
    state.hasMorePosts = state.mainPosts.length < 50;
  },
  [LOAD_POSTS_FAILURE]: (state: IPostState, action) => {
    state.loadPostsLoading = false;
    state.loadPostsError = action.error;
  },
};

export const useLoadPostHandler = () => {
  return { initialState, actions };
};

export default function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
