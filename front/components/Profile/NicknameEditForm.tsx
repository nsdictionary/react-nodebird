import React, { useMemo } from "react";
import { Form, Input } from "antd";

const NicknameEditForm = () => {
  const style = useMemo(
    () => ({
      marginBottom: 20,
      border: "1px solid #d9d9d9",
      padding: 20,
    }),
    []
  );
  return (
    <Form style={style}>
      <Input.Search addonBefore="Nickname" enterButton="change" />
    </Form>
  );
};

export default NicknameEditForm;
