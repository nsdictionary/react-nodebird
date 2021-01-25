import { put, call, throttle } from "redux-saga/effects";
import {
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
} from "../../store/constants";
import axios from "axios";
import { IPostState } from "../../reducers/post";

function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

const actions = {
  [LOAD_USER_POSTS_REQUEST]: (state: IPostState, action) => {
    state.loadPostsLoading = true;
    state.loadPostsDone = false;
    state.loadPostsError = null;
  },
  [LOAD_USER_POSTS_SUCCESS]: (state: IPostState, action) => {
    state.loadPostsLoading = false;
    state.loadPostsDone = true;
    state.mainPosts = state.mainPosts.concat(action.data);
    state.hasMorePosts = action.data.length === 10;
  },
  [LOAD_USER_POSTS_FAILURE]: (state: IPostState, action) => {
    state.loadPostsLoading = false;
    state.loadPostsError = action.error;
  },
};

export const useLoadUserPostsHandler = () => {
  return { initialState: {}, actions };
};

export default function* watchLoadUserPosts() {
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
