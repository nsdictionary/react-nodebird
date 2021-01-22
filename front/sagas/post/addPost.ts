import { all, fork, put, takeLatest, call, delay } from "redux-saga/effects";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_TO_ME,
} from "../../store/constants";
import axios from "axios";

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
      data: action.data,
    });
    // yield put({
    //   type: ADD_POST_TO_ME,
    //   data: result.data.id,
    // });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}
export default function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
