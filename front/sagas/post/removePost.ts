import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../../store/constants";
import { IPostState } from "../../reducers/post";

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
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

export interface IRemovePostState {
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: null | string;
}

const initialState = {
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

const actions = {
  [REMOVE_POST_REQUEST]: (state: IPostState, action) => {
    state.removePostLoading = true;
    state.removePostDone = false;
    state.removePostError = null;
  },
  [REMOVE_POST_SUCCESS]: (state: IPostState, action) => {
    state.removePostLoading = false;
    state.removePostDone = true;
    state.mainPosts = state.mainPosts.filter((v) => v.id !== action.data);
  },
  [REMOVE_POST_FAILURE]: (state: IPostState, action) => {
    state.removePostLoading = false;
    state.removePostError = action.error;
  },
};

export const useRemovePostHandler = () => {
  return { initialState, actions };
};

export default function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
