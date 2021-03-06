import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user, { IUserState } from "./user";
import post, { IPostState } from "./post";

export interface IState {
  user: IUserState;
  post: IPostState;
}

// (prev state, action) => next state
// const rootReducer = combineReducers({
//   index: (state: any = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         return { ...state, ...action.payload };
//       default:
//         return state;
//     }
//   },
//   user,
//   post,
// });

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
