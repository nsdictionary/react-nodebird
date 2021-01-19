import React, { useCallback, useState } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";

const LoginForm = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  return (
    <Form>
      <div>
        <label htmlFor="user_id">ID</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor="user-password">Password</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>
          Login
        </Button>
        <Link href="/signup">
          <a>
            <Button>Register</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
