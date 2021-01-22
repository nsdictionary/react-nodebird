import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from "../../store/constants";

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

export default function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
