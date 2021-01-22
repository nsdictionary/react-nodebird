import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../../store/constants";

function removePostAPI(data) {
  return axios.delete("/api/post", data);
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    // yield put({
    //   type: REMOVE_POST_OF_ME,
    //   data: action.data,
    // });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

export default function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
