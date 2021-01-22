import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../store/constants";
import { IPost } from "./post";

export const initialState = {
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

type userError = null | string;

export interface IUserState {
  followLoading: boolean;
  followDone: boolean;
  followError: userError;
  unfollowLoading: boolean;
  unfollowDone: boolean;
  unfollowError: userError;
  logInLoading: boolean;
  logInDone: boolean;
  logInError: userError;
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: userError;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: userError;
  changeNicknameLoading: boolean;
  changeNicknameDone: boolean;
  changeNicknameError: userError;
  me: null | {
    id: number;
    nickname: string;
    email: string;
    Posts: IPost[];
    Followings: { nickname: string }[];
    Followers: { nickname: string }[];
  };
  signUpData: any;
  loginData: any;
}

const dummyUser = (data) => ({
  ...data,
  nickname: "DS1SVG",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: "부기초" },
    { nickname: "Chanho Lee" },
    { nickname: "neue zeal" },
  ],
  Followers: [
    { nickname: "부기초" },
    { nickname: "Chanho Lee" },
    { nickname: "neue zeal" },
  ],
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        me: dummyUser(action.data),
        logInDone: true,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutError: null,
        logOutDone: false,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpError: null,
        signUpDone: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
