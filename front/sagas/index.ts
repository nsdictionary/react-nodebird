import { all, fork } from "redux-saga/effects";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;

import watchLoadUser from "./user/loadMyInfo";
import watchLogIn from "./user/login";
import watchLogOut from "./user/logout";
import watchSignUp from "./user/signUp";
import watchFollow from "./user/follow";
import watchUnfollow from "./user/unfollow";
import watchChangeNickname from "./user/changeNickname";
import watchLoadFollowers from "./user/loadFollowers";
import watchLoadFollowings from "./user/loadFollowings";
import watchRemoveFollower from "./user/removeFollower";
import watchAddPost from "./post/addPost";
import watchAddComment from "./post/addComment";
import watchRemovePost from "./post/removePost";
import watchLoadPosts from "./post/loadPost";
import watchLikePost from "./post/likePost";
import watchUnlikePost from "./post/unlikePost";
import watchRetweet from "./post/retweet";
import watchUploadImages from "./post/uploadImage";

export default function* rootSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchChangeNickname),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRetweet),
    fork(watchUploadImages),
  ]);
}
