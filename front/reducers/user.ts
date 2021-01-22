import {
  ADD_POST_TO_ME,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  REMOVE_POST_OF_ME,
} from "../store/constants";
import createReducer from "../util/createReducer";
import {
  ILoginState,
  loginHandler,
  loginInitialState,
} from "../sagas/user/login";
import {
  ILogoutState,
  logoutHandler,
  logoutInitialState,
} from "../sagas/user/logout";
import {
  ISignUpState,
  signUpHandler,
  signUpInitialState,
} from "../sagas/user/signUp";

export const initialState = {
  ...loginInitialState,
  ...logoutInitialState,
  ...signUpInitialState,
  me: null,
  signUpData: {},
  loginData: {},
};

export interface IUserState extends ILoginState, ILogoutState, ISignUpState {
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

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = createReducer(initialState, {
  ...loginHandler,
  ...logoutHandler,
  ...signUpHandler,
  [ADD_POST_TO_ME]: (state, action) => {
    state.me.Posts.unshift({ id: action.data });
  },
  [REMOVE_POST_OF_ME]: (state, action) => {
    state.me.Posts = state.me.Posts.filter((v) => v.id !== action.data);
  },
});

export default reducer;
