import {
  ADD_POST_TO_ME,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  REMOVE_POST_OF_ME,
} from "../store/constants";
import createReducer from "../util/createReducer";
import { ILogInState, useLogInHandler } from "../sagas/user/login";
import { ILogOutState, useLogOutHandler } from "../sagas/user/logout";
import { ISignUpState, useSignUpHandler } from "../sagas/user/signUp";
import { IFollowState, useFollowHandler } from "../sagas/user/follow";
import { IUnfollowState, useUnfollowHandler } from "../sagas/user/unfollow";
import {
  ILoadMyInfoState,
  useLoadMyInfoHandler,
} from "../sagas/user/loadMyInfo";
import {
  IChangeNicknameState,
  useChangeNicknameHandler,
} from "../sagas/user/changeNickname";
import {
  ILoadFollowersState,
  useLoadFollowersHandler,
} from "../sagas/user/loadFollowers";
import {
  ILoadFollowingsState,
  useLoadFollowingsHandler,
} from "../sagas/user/loadFollowings";
import {
  IRemoveFollowerState,
  useRemoveFollowerHandler,
} from "../sagas/user/removeFollower";

const handlers = [
  useLogOutHandler(),
  useLogInHandler(),
  useSignUpHandler(),
  useFollowHandler(),
  useUnfollowHandler(),
  useLoadMyInfoHandler(),
  useChangeNicknameHandler(),
  useLoadFollowersHandler(),
  useLoadFollowingsHandler(),
  useRemoveFollowerHandler(),
];

export const initialState = {
  ...handlers
    .map((v) => {
      return { ...v.initialState };
    })
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }),
  me: null,
  signUpData: {},
  loginData: {},
};

// TODO: Fix id type to number after integrate DB
type idType = number | string;

export interface IUserState
  extends ILogInState,
    ILogOutState,
    ISignUpState,
    IFollowState,
    IUnfollowState,
    ILoadMyInfoState,
    IChangeNicknameState,
    ILoadFollowersState,
    ILoadFollowingsState,
    IRemoveFollowerState {
  me: null | {
    id: idType;
    nickname: string;
    email: string;
    Posts: { id: idType }[];
    Followings: { id: idType; nickname: string }[];
    Followers: { id: idType; nickname: string }[];
  };
  signUpData: any;
  loginData: any;
}

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = createReducer(initialState, {
  ...handlers
    .map((v) => {
      return { ...v.actions };
    })
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }),
  [ADD_POST_TO_ME]: (state, action) => {
    state.me.Posts.unshift({ id: action.data.id });
  },
  [REMOVE_POST_OF_ME]: (state, action) => {
    state.me.Posts = state.me.Posts.filter((v) => v.id !== action.data);
  },
});

export default reducer;
