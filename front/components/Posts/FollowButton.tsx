import React, { useCallback } from "react";
import { IPost } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../reducers";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../../store/constants";
import { Button } from "antd";

interface IProps {
  post: IPost;
}

const FollowButton = ({ post }: IProps) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state: IState) => state.user
  );
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (!me) {
      return alert("로그인이 필요합니다.");
    }
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [me, isFollowing]);

  if (me.id === post.User.id) {
    return null;
  }

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

export default FollowButton;
