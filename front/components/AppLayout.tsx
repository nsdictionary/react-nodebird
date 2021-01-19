import React, { useState } from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

interface IProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: IProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div>
      <Menu mode={"horizontal"}>
        <Menu.Item>
          <Link href="/">
            <a>Nodebird</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col style={{ backgroundColor: "magenta" }} xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col style={{ backgroundColor: "aqua" }} xs={24} md={12}>
          {children}
        </Col>
        <Col style={{ backgroundColor: "lightgray" }} xs={24} md={6}>
          <a href="http://google.com" target="_blank" rel="noreferrer noopener">
            Google
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
