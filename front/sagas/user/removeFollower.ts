import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

export interface IRemoveFollowerState {
  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: null | string;
}

const initialState = {
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
};

const actions = {
  [REMOVE_FOLLOWER_REQUEST]: (state: IUserState, action) => {
    state.removeFollowerLoading = true;
    state.removeFollowerError = null;
    state.removeFollowerDone = false;
  },
  [REMOVE_FOLLOWER_SUCCESS]: (state: IUserState, action) => {
    state.removeFollowerLoading = false;
    state.me.Followers = state.me.Followers.filter(
      (v) => v.id !== action.data.UserId
    );
    state.removeFollowerDone = true;
  },
  [REMOVE_FOLLOWER_FAILURE]: (state: IUserState, action) => {
    state.removeFollowerLoading = false;
    state.removeFollowerError = action.error;
  },
};

export const useRemoveFollowerHandler = () => {
  return { initialState, actions };
};

export default function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
