import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import { LOG_IN_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";

// function* watchLogIn() {
//   yield takeLatest(LOG_IN_REQUEST, logIn);
// }
//
// function* watchLogOut() {
//   yield takeLatest(LOG_OUT_REQUEST, logOut);
// }

export default function* postSaga() {
  yield all([
    // fork(watchLogIn),
    // fork(watchLogOut)
  ]);
}
