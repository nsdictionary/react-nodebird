import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function signUpAPI() {
  return axios.post("/api/signUp");
}

function* signUp() {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

export interface ISignUpState {
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: null | string;
}

const initialState = {
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
};

const actions = {
  [SIGN_UP_REQUEST]: (state: IUserState, action) => {
    state.signUpLoading = true;
    state.signUpError = null;
    state.signUpDone = false;
  },
  [SIGN_UP_SUCCESS]: (state: IUserState, action) => {
    state.signUpLoading = false;
    state.signUpDone = true;
  },
  [SIGN_UP_FAILURE]: (state: IUserState, action) => {
    state.signUpLoading = false;
    state.signUpError = action.error;
  },
};

export const useSignUpHandler = () => {
  return { initialState, actions };
};

export default function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
