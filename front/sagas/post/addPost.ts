import { all, fork, put, takeLatest, call, delay } from "redux-saga/effects";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_TO_ME,
} from "../../store/constants";
import axios from "axios";
import shortId from "shortid";

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      // data: result.data.id,
      data: id,
    });
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
