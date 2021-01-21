export const initialState = {
  mainPosts: [],
};

export interface IPostState {
  mainPosts: any;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
