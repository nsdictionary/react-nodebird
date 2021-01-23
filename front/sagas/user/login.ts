import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

const dummyUser = (data) => ({
  ...data,
  nickname: "DS1SVG",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: "부기초" },
    { nickname: "Chanho Lee" },
    { nickname: "neue zeal" },
  ],
  Followers: [
    { nickname: "부기초" },
    { nickname: "Chanho Lee" },
    { nickname: "neue zeal" },
  ],
});

export interface ILogInState {
  logInLoading: boolean;
  logInDone: boolean;
  logInError: null | string;
}

const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
};

const actions = {
  [LOG_IN_REQUEST]: (state: IUserState, action) => {
    state.logInLoading = true;
    state.logInError = null;
    state.logInDone = false;
  },
  [LOG_IN_SUCCESS]: (state: IUserState, action) => {
    state.logInLoading = false;
    // state.me = dummyUser(action.data);
    state.me = action.data;
    state.logInDone = true;
  },
  [LOG_IN_FAILURE]: (state: IUserState, action) => {
    state.logInLoading = false;
    state.logInError = action.error;
  },
};

export const useLogInHandler = () => {
  return { initialState, actions };
};

export default function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
