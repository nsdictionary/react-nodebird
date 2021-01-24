import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function loadUserAPI() {
  return axios.get("/user");
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

export interface ILoadMyInfoState {
  loadUserLoading: boolean;
  loadUserDone: boolean;
  loadUserError: null | string;
}

const initialState = {
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
};

const actions = {
  [LOAD_MY_INFO_REQUEST]: (state: IUserState, action) => {
    state.loadUserLoading = true;
    state.loadUserError = null;
    state.loadUserDone = false;
  },
  [LOAD_MY_INFO_SUCCESS]: (state: IUserState, action) => {
    state.loadUserLoading = false;
    state.me = action.data;
    state.loadUserDone = true;
  },
  [LOAD_MY_INFO_FAILURE]: (state: IUserState, action) => {
    state.loadUserLoading = false;
    state.loadUserError = action.error;
  },
};

export const useLoadMyInfoHandler = () => {
  return { initialState, actions };
};

export default function* watchLoadUser() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadUser);
}
