import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../../reducers/user";
import { IState } from "../../reducers";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state: IState) => state.user);
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          twit
          <br />0
        </div>,
        <div key="followings">
          followings
          <br />0
        </div>,
        <div key="followers">
          followers
          <br />0
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={logOutLoading}>
        Logout
      </Button>
    </Card>
  );
};

export default UserProfile;
