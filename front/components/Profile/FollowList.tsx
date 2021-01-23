import React from "react";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";

interface IFollow {
  id: number | string;
  nickname: string;
}

interface IProps {
  header: string;
  data: IFollow[];
  onClickMore: any;
  loading: boolean;
}

const FollowList = ({ header, data, onClickMore, loading }: IProps) => {
  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button onClick={onClickMore} loading={loading}>
            More
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item: IFollow) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
