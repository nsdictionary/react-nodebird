import { put, takeLatest, call, delay } from "redux-saga/effects";
import {
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from "../../store/constants";
import axios from "axios";
import { IUserState } from "../../reducers/user";

function logOutAPI() {
  return axios.post("/user/logout");
}

function* logOut() {
  try {
    // yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

export const logoutInitialState = {
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
};

export interface ILogoutState {
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: null | string;
}

export const logoutHandler = {
  [LOG_OUT_REQUEST]: (state: IUserState, action) => {
    state.logOutLoading = true;
    state.logOutError = null;
    state.logOutDone = false;
  },
  [LOG_OUT_SUCCESS]: (state: IUserState, action) => {
    state.logOutLoading = false;
    state.logOutDone = true;
    state.me = null;
  },
  [LOG_OUT_FAILURE]: (state: IUserState, action) => {
    state.logOutLoading = false;
    state.logOutError = action.error;
  },
};

export default function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
