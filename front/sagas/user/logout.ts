import { put, takeLatest, call, delay } from "redux-saga/effects";
import {
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from "../../store/constants";
import axios from "axios";

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

export default function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
