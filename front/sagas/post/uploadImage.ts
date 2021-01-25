import { put, takeLatest, call, delay } from "redux-saga/effects";
import {
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
} from "../../store/constants";
import axios from "axios";
import { IPostState } from "../../reducers/post";

function uploadImagesAPI(data) {
  return axios.post("/post/images", data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

export interface IUploadImagesState {
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: null | string;
}

const initialState = {
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
};

const actions = {
  [UPLOAD_IMAGES_REQUEST]: (state: IPostState, action) => {
    state.uploadImagesLoading = true;
    state.uploadImagesDone = false;
    state.uploadImagesError = null;
  },
  [UPLOAD_IMAGES_SUCCESS]: (state: IPostState, action) => {
    state.imagePaths = action.data;
    state.uploadImagesLoading = false;
    state.uploadImagesDone = true;
  },
  [UPLOAD_IMAGES_FAILURE]: (state: IPostState, action) => {
    state.uploadImagesLoading = false;
    state.uploadImagesError = action.error;
  },
};

export const useUploadImagesHandler = () => {
  return { initialState, actions };
};

export default function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
