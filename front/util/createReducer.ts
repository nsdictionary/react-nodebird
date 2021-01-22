import produce from "immer";
import { WritableDraft } from "immer/dist/types/types-external";
import { IPostState } from "../reducers/post";

export default function createReducer(initState, handlerMap) {
  return function (state = initState, action) {
    return produce(state, (draft: WritableDraft<IPostState>) => {
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  };
}
