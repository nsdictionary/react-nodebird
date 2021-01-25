import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

export interface ILoadUserState {
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
  [LOAD_USER_REQUEST]: (state: IUserState, action) => {
    state.loadUserLoading = true;
    state.loadUserError = null;
    state.loadUserDone = false;
  },
  [LOAD_USER_SUCCESS]: (state: IUserState, action) => {
    state.loadUserLoading = false;
    state.userInfo = action.data;
    state.loadUserDone = true;
  },
  [LOAD_USER_FAILURE]: (state: IUserState, action) => {
    state.loadUserLoading = false;
    state.loadUserError = action.error;
  },
};

export const useLoadUserHandler = () => {
  return { initialState, actions };
};

export default function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
