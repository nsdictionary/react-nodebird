import React from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../reducers/user";
import { useForm, Controller } from "react-hook-form";
import { IState } from "../../reducers";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const FormError = styled.div`
  color: red;
`;

interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state: IState) => state.user);
  const { errors, getValues, handleSubmit, control } = useForm<ILoginForm>({
    mode: "onSubmit",
  });

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = getValues();
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  };

  return (
    <FormWrapper onFinish={handleSubmit(onSubmitForm)}>
      <div>
        <label htmlFor="login_email">Email</label>
        <br />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              id="login_email"
              value={value}
              onChange={onChange}
              placeholder="Email"
            />
          )}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email address",
            },
          }}
        />
        {errors.email?.message && (
          <FormError>{errors.email?.message}</FormError>
        )}
      </div>
      <div>
        <label htmlFor="login_password">Password</label>
        <br />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <Input
              id="login_password"
              type="password"
              value={value}
              onChange={onChange}
              placeholder="Password"
            />
          )}
          rules={{ required: "Password is required" }}
        />
        {errors.password?.message && (
          <FormError>{errors.password?.message}</FormError>
        )}
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          Login
        </Button>
        <Link href="/signup">
          <a>
            <Button>Register</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
