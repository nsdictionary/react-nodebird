import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

export interface IFollowState {
  followLoading: boolean;
  followDone: boolean;
  followError: null | string;
}

const initialState = {
  followLoading: false,
  followDone: false,
  followError: null,
};

const actions = {
  [FOLLOW_REQUEST]: (state: IUserState, action) => {
    state.followLoading = true;
    state.followError = null;
    state.followDone = false;
  },
  [FOLLOW_SUCCESS]: (
    state: IUserState,
    action: { data: { UserId: number; nickname: string } }
  ) => {
    state.followLoading = false;
    state.me.Followings.push({
      id: action.data.UserId,
      nickname: action.data.nickname,
    });
    state.followDone = true;
  },
  [FOLLOW_FAILURE]: (state: IUserState, action) => {
    state.followLoading = false;
    state.followError = action.error;
  },
};

export const useFollowHandler = () => {
  return { initialState, actions };
};

export default function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
