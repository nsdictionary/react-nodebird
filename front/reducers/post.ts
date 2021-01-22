import shortId from "shortid";
import faker from "faker";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../store/constants";
import createReducer from "../util/createReducer";

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫 번째 게시글 #reactjs #nestjs",
      Images: [
        {
          src:
            "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요~",
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "hero",
          },
          content: "얼른 사고싶어요~",
        },
      ],
    },
  ],
  imagePaths: [],
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

type idType = any;

type User = {
  id: idType;
  nickname: string;
};

export interface IPost {
  id: idType;
  content: string;
  User: User;
  Images: { src: string }[];
  Comments: {
    id: idType;
    User: User;
    content: string;
  }[];
}

type postError = null | string;

export interface IPostState {
  mainPosts: IPost[];
  imagePaths: any;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: postError;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: postError;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: postError;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: postError;
}

export const generateDummyPost = (number: number): IPost[] =>
  Array(number)
    .fill(0)
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

initialState.mainPosts = [...initialState.mainPosts, ...generateDummyPost(10)];

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
});
const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 2,
    nickname: "제로초",
  },
});

const reducer = createReducer(initialState, {
  [ADD_POST_REQUEST]: (state, action) => {
    state.addPostLoading = true;
    state.addPostDone = false;
    state.addPostError = null;
  },
  [ADD_POST_SUCCESS]: (state, action) => {
    state.addPostLoading = false;
    state.addPostDone = true;
    state.mainPosts.unshift(dummyPost(action.data));
  },
  [ADD_POST_FAILURE]: (state, action) => {
    state.addPostLoading = false;
    state.addPostError = action.error;
  },
  [REMOVE_POST_REQUEST]: (state, action) => {
    state.removePostLoading = true;
    state.removePostDone = false;
    state.removePostError = null;
  },
  [REMOVE_POST_SUCCESS]: (state, action) => {
    state.removePostLoading = false;
    state.removePostDone = true;
    state.mainPosts = state.mainPosts.filter((v) => v.id !== action.data);
  },
  [REMOVE_POST_FAILURE]: (state, action) => {
    state.removePostLoading = false;
    state.removePostError = action.error;
  },
  [ADD_COMMENT_REQUEST]: (state, action) => {
    state.addCommentLoading = true;
    state.addCommentDone = false;
    state.addCommentError = null;
  },
  [ADD_COMMENT_SUCCESS]: (state, action) => {
    const post = state.mainPosts.find((v) => v.id === action.data.postId);
    post.Comments.unshift(dummyComment(action.data.content));
    state.addCommentLoading = false;
    state.addCommentDone = true;
  },
  [ADD_COMMENT_FAILURE]: (state, action) => {
    state.addCommentLoading = false;
    state.addCommentError = action.error;
  },
});

export default reducer;
