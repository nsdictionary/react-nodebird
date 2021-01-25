import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function loadMyInfoAPI() {
  return axios.get("/user");
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

export interface ILoadMyInfoState {
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: null | string;
}

const initialState = {
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
};

const actions = {
  [LOAD_MY_INFO_REQUEST]: (state: IUserState, action) => {
    state.loadMyInfoLoading = true;
    state.loadMyInfoError = null;
    state.loadMyInfoDone = false;
  },
  [LOAD_MY_INFO_SUCCESS]: (state: IUserState, action) => {
    state.loadMyInfoLoading = false;
    state.me = action.data;
    state.loadMyInfoDone = true;
  },
  [LOAD_MY_INFO_FAILURE]: (state: IUserState, action) => {
    state.loadMyInfoLoading = false;
    state.loadMyInfoError = action.error;
  },
};

export const useLoadMyInfoHandler = () => {
  return { initialState, actions };
};

export default function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
