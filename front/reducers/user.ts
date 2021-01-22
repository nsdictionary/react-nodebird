import {
  ADD_POST_REQUEST,
  ADD_POST_TO_ME,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REMOVE_POST_OF_ME,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../store/constants";
import createReducer from "../util/createReducer";

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
    Posts: { id: number | string }[];
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

const reducer = createReducer(initialState, {
  [LOG_IN_REQUEST]: (state, action) => {
    state.logInLoading = true;
    state.logInError = null;
    state.logInDone = false;
  },
  [LOG_IN_SUCCESS]: (state, action) => {
    state.logInLoading = false;
    state.me = dummyUser(action.data);
    state.logInDone = true;
  },
  [LOG_IN_FAILURE]: (state, action) => {
    state.logInLoading = false;
    state.logInError = action.error;
  },
  [LOG_OUT_REQUEST]: (state, action) => {
    state.logOutLoading = true;
    state.logOutError = null;
    state.logOutDone = false;
  },
  [LOG_OUT_SUCCESS]: (state, action) => {
    state.logOutLoading = false;
    state.logOutDone = true;
    state.me = null;
  },
  [LOG_OUT_FAILURE]: (state, action) => {
    state.logOutLoading = false;
    state.logOutError = action.error;
  },
  [SIGN_UP_REQUEST]: (state, action) => {
    state.signUpLoading = true;
    state.signUpError = null;
    state.signUpDone = false;
  },
  [SIGN_UP_SUCCESS]: (state, action) => {
    state.signUpLoading = false;
    state.signUpDone = true;
  },
  [SIGN_UP_FAILURE]: (state, action) => {
    state.signUpLoading = false;
    state.signUpError = action.error;
  },
  [ADD_POST_TO_ME]: (state, action) => {
    state.me.Posts.unshift({ id: action.data });
  },
  [REMOVE_POST_OF_ME]: (state, action) => {
    state.me.Posts = state.me.Posts.filter((v) => v.id !== action.data);
  },
});

export default reducer;
