import { all, fork } from "redux-saga/effects";

import watchLogIn from "./user/login";
import watchLogOut from "./user/logout";
import watchSignUp from "./user/signUp";
import watchFollow from "./user/follow";
import watchUnfollow from "./user/unfollow";
import watchAddPost from "./post/addPost";
import watchAddComment from "./post/addComment";
import watchRemovePost from "./post/removePost";
import watchLoadPosts from "./post/loadPost";

export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
  ]);
}
