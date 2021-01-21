import React from "react";
import { IPost } from "../../reducers/post";

interface IProps {
  post: IPost;
}

const FollowButton = ({ post }: IProps) => {
  return <div>팔로우</div>;
};

export default FollowButton;
