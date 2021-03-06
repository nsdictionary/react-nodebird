import { put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from "../../store/constants";
import { IUserState } from "../../reducers/user";

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

export interface IUnfollowState {
  unfollowLoading: boolean;
  unfollowDone: boolean;
  unfollowError: null | string;
}

const initialState = {
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
};

const actions = {
  [UNFOLLOW_REQUEST]: (state: IUserState, action) => {
    state.unfollowLoading = true;
    state.unfollowError = null;
    state.unfollowDone = false;
  },
  [UNFOLLOW_SUCCESS]: (state: IUserState, action) => {
    state.unfollowLoading = false;
    state.me.Followings = state.me.Followings.filter(
      (v) => v.id !== action.data.UserId
    );
    state.unfollowDone = true;
  },
  [UNFOLLOW_FAILURE]: (state: IUserState, action) => {
    state.unfollowLoading = false;
    state.unfollowError = action.error;
  },
};

export const useUnfollowHandler = () => {
  return { initialState, actions };
};

export default function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
