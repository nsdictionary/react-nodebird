import React from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";

interface IProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: IProps) => {
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
        <Col
          style={{ backgroundColor: "blue", height: "100px" }}
          xs={24}
          md={6}
        />
        <Col
          style={{ backgroundColor: "red", height: "100px" }}
          xs={24}
          md={12}
        >
          {children}
        </Col>
        <Col
          style={{ backgroundColor: "green", height: "100px" }}
          xs={24}
          md={6}
        >
          <a href="http://google.com" target="_blank" rel="noreferrer noopener">
            Google
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
