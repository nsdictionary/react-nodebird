import shortId from "shortid";
import faker from "faker";
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
import { ILikePostState, useLikePostHandler } from "../sagas/post/likePost";
import {
  IUnLikePostState,
  useUnLikePostHandler,
} from "../sagas/post/unlikePost";
import { IRetweetState, useRetweetHandler } from "../sagas/post/retweet";
import {
  IUploadImagesState,
  useUploadImagesHandler,
} from "../sagas/post/uploadImage";
import { REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from "../store/constants";

const handlers = [
  useAddCommentHandler(),
  useAddPostHandler(),
  useRemovePostHandler(),
  useLoadPostHandler(),
  useLikePostHandler(),
  useUnLikePostHandler(),
  useRetweetHandler(),
  useUploadImagesHandler(),
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
  Likers: { id: idType }[];
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
    ILoadPostState,
    ILikePostState,
    IUnLikePostState,
    IRetweetState,
    IUploadImagesState {
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
      Likers: [],
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

const reducer = createReducer(initialState, {
  ...handlers
    .map((v) => {
      return { ...v.actions };
    })
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }),
  [REMOVE_IMAGE]: (state: IPostState, action) => {
    state.imagePaths = state.imagePaths.filter((v, i) => i !== action.data);
  },
});

export default reducer;
