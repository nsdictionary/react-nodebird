import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function loadFollowersAPI(data) {
  return axios.get("/user/followers", data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

export interface ILoadFollowersState {
  loadFollowersLoading: boolean;
  loadFollowersDone: boolean;
  loadFollowersError: null | string;
}

const initialState = {
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
};

const actions = {
  [LOAD_FOLLOWERS_REQUEST]: (state: IUserState, action) => {
    state.loadFollowersLoading = true;
    state.loadFollowersError = null;
    state.loadFollowersDone = false;
  },
  [LOAD_FOLLOWERS_SUCCESS]: (state: IUserState, action) => {
    state.loadFollowersLoading = false;
    state.me.Followers = action.data;
    state.loadFollowersDone = true;
  },
  [LOAD_FOLLOWERS_FAILURE]: (state: IUserState, action) => {
    state.loadFollowersLoading = false;
    state.loadFollowersError = action.error;
  },
};

export const useLoadFollowersHandler = () => {
  return { initialState, actions };
};

export default function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
