import React, { useCallback } from "react";
import { Avatar, Button, Card } from "antd";

interface IProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const UserProfile = ({ setIsLoggedIn }: IProps) => {
  const onLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">twit<br />0</div>,
        <div key="followings">followings<br />0</div>,
        <div key="followers">followers<br />0</div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>SVG</Avatar>} title="DS1SVG" />
      <Button onClick={onLogout}>Logout</Button>
    </Card>
  );
};

export default UserProfile;
