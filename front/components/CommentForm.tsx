import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import { IPost } from "../reducers/post";

interface IProps {
  post: IPost;
}

const CommentForm = ({ post }: IProps) => {
  const [commentText, setCommentText] = useState("");

  const onSubmitComment = useCallback(() => {
    console.log(commentText);
  }, [commentText]);

  const onChangeCommentText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentText(e.target.value);
    },
    []
  );

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
