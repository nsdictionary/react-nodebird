import shortId from "shortid";
import faker from "faker";
import { ADD_COMMENT_REQUEST, ADD_POST_REQUEST } from "../store/constants";
import createReducer from "../util/createReducer";
import {
  addPostHandler,
  addPostInitialState,
  IAddPostState,
} from "../sagas/post/addPost";
import {
  removePostHandler,
  removePostInitialState,
  IRemovePostState,
} from "../sagas/post/removePost";
import {
  addCommentHandler,
  addCommentInitialState,
  IAddCommentState,
} from "../sagas/post/addComment";

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
  ...addPostInitialState,
  ...removePostInitialState,
  ...addCommentInitialState,
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

export interface IPostState
  extends IAddPostState,
    IRemovePostState,
    IAddCommentState {
  mainPosts: IPost[];
  imagePaths: any;
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

const reducer = createReducer(initialState, {
  ...addPostHandler,
  ...removePostHandler,
  ...addCommentHandler,
});

export default reducer;
