import shortId from "shortid";
import faker from "faker";
import { ADD_COMMENT_REQUEST, ADD_POST_REQUEST } from "../store/constants";
import createReducer from "../util/createReducer";
import {
  IAddCommentState,
  useAddCommentHandler,
} from "../sagas/post/addComment";
import { IAddPostState, useAddPostHandler } from "../sagas/post/addPost";
import {
  IRemovePostState,
  useRemovePostHandler,
} from "../sagas/post/removePost";
import { ILoadPostState, useLoadPostHandler } from "../sagas/post/loadPost";

const handlers = [
  useAddCommentHandler(),
  useAddPostHandler(),
  useRemovePostHandler(),
  useLoadPostHandler(),
];

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  ...handlers
    .map((v) => {
      return { ...v.initialState };
    })
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }),
};

// TODO: Fix id type to number after integrate DB
type idType = number | string;

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
    IAddCommentState,
    ILoadPostState {
  mainPosts: IPost[];
  hasMorePosts: boolean;
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

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = createReducer(initialState, {
  ...handlers
    .map((v) => {
      return { ...v.actions };
    })
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }),
});

export default reducer;
