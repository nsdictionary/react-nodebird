import { all, fork } from "redux-saga/effects";

import watchLogIn from "./user/login";
import watchLogOut from "./user/logout";
import watchSignUp from "./user/signUp";

import watchAddPost from "./post/addPost";
import watchAddComment from "./post/addComment";

export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}
