import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function changeNicknameAPI(data) {
  return axios.patch("/user/nickname", { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

export interface IChangeNicknameState {
  changeNicknameLoading: boolean;
  changeNicknameDone: boolean;
  changeNicknameError: null | string;
}

const initialState = {
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
};

const actions = {
  [CHANGE_NICKNAME_REQUEST]: (state: IUserState, action) => {
    state.changeNicknameLoading = true;
    state.changeNicknameError = null;
    state.changeNicknameDone = false;
  },
  [CHANGE_NICKNAME_SUCCESS]: (state: IUserState, action) => {
    state.me.nickname = action.data.nickname;
    state.changeNicknameLoading = false;
    state.changeNicknameDone = true;
  },
  [CHANGE_NICKNAME_FAILURE]: (state: IUserState, action) => {
    state.changeNicknameLoading = false;
    state.changeNicknameError = action.error;
  },
};

export const useChangeNicknameHandler = () => {
  return { initialState, actions };
};

export default function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
