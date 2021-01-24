import { put, takeLatest, call, delay } from "redux-saga/effects";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_TO_ME,
} from "../../store/constants";
import axios from "axios";
import { IPostState } from "../../reducers/post";

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
});

export interface IAddPostState {
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: null | string;
}

const initialState = {
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

const actions = {
  [ADD_POST_REQUEST]: (state: IPostState, action) => {
    state.addPostLoading = true;
    state.addPostDone = false;
    state.addPostError = null;
  },
  [ADD_POST_SUCCESS]: (state: IPostState, action) => {
    state.addPostLoading = false;
    state.addPostDone = true;
    state.mainPosts.unshift(action.data);
    state.imagePaths = [];
  },
  [ADD_POST_FAILURE]: (state: IPostState, action) => {
    state.addPostLoading = false;
    state.addPostError = action.error;
  },
};

export const useAddPostHandler = () => {
  return { initialState, actions };
};

export default function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
