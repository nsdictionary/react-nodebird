import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import { IState } from "../reducers";
import { createGlobalStyle } from "styled-components";

// antd design bug fix (gutter)
const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-left: 0 !important;
  }
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

interface IProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: IProps) => {
  const { isLoggedIn } = useSelector((state: IState) => state.user);

  return (
    <div>
      <Global />
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
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="http://google.com" target="_blank" rel="noreferrer noopener">
            Google
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
