import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function loadFollowingsAPI(data) {
  return axios.get("/user/followings", data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

export interface ILoadFollowingsState {
  loadFollowingsLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: null | string;
}

const initialState = {
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
};

const actions = {
  [LOAD_FOLLOWINGS_REQUEST]: (state: IUserState, action) => {
    state.loadFollowingsLoading = true;
    state.loadFollowingsError = null;
    state.loadFollowingsDone = false;
  },
  [LOAD_FOLLOWINGS_SUCCESS]: (state: IUserState, action) => {
    state.loadFollowingsLoading = false;
    state.me.Followings = action.data;
    state.loadFollowingsDone = true;
  },
  [LOAD_FOLLOWINGS_FAILURE]: (state: IUserState, action) => {
    state.loadFollowingsLoading = false;
    state.loadFollowingsError = action.error;
  },
};

export const useLoadFollowingsHandler = () => {
  return { initialState, actions };
};

export default function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
