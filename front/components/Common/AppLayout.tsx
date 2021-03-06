import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import LoginForm from "../Login/LoginForm";
import UserProfile from "../Login/UserProfile";
import styled from "styled-components";
import { IState } from "../../reducers";
import { createGlobalStyle } from "styled-components";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

interface IProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: IProps) => {
  const { me } = useSelector((state: IState) => state.user);
  const [searchInput, onChangeSearchInput] = useInput("");
  const router = useRouter();

  const onSearch = useCallback(async () => {
    await router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

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
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
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
