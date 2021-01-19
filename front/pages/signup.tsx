import React, { useCallback, useState } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Button, Checkbox, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState<boolean>(false);
  const [termError, setTermError] = useState<boolean>(false);
  const onChangeTerm = useCallback((e: CheckboxChangeEvent) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>Signup | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">Email</label>
          <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nick">Nickname</label>
          <br />
          <Input
            name="user-nick"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">password</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">confirm password</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMessage>Password not matched</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            Lorem ipsum dolor sit amet, consectetur
          </Checkbox>
          {termError && <ErrorMessage>You must agree term</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
