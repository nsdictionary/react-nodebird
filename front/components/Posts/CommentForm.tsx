import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { IPost } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../../store/constants";
import { IState } from "../../reducers";

interface IProps {
  post: IPost;
}

const CommentForm = ({ post }: IProps) => {
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector(
    (state: IState) => state.post
  );
  const { id } = useSelector((state: IState) => state.user?.me);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, userId: id, postId: post.id },
    });
  }, [commentText]);

  const onChangeCommentText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentText(e.target.value);
    },
    [commentText, id]
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
          loading={addCommentLoading}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
