import React, { useCallback, useState } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Button, Checkbox, Form, Input } from "antd";
import styled from "styled-components";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Controller, useForm } from "react-hook-form";

const FormError = styled.div`
  color: red;
`;

interface ISignupForm {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  term: boolean;
}

const Signup = () => {
  const {
    errors,
    watch,
    getValues,
    handleSubmit,
    control,
  } = useForm<ISignupForm>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const { email, password, nickname } = getValues();
    console.log(email, nickname, password);
  };

  return (
    <AppLayout>
      <Head>
        <title>Signup | NodeBird</title>
      </Head>
      <Form onFinish={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="signup_email">Email</label>
          <br />
          <Controller
            name="mail"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                id="signup_email"
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
          <label htmlFor="signup_nickname">Nickname</label>
          <br />
          <Controller
            name="nickname"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                id="signup_nickname"
                value={value}
                onChange={onChange}
                type="text"
                placeholder="Nickname"
              />
            )}
            rules={{ required: "Nickname is required" }}
          />
          {errors.nickname?.message && (
            <FormError>{errors.nickname?.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor="signup_password">password</label>
          <br />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                id="signup_password"
                type="password"
                value={value}
                onChange={onChange}
                placeholder="Password"
              />
            )}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum password length greater than 6 ",
              },
            }}
          />
          {errors.password?.message && (
            <FormError>{errors.password?.message}</FormError>
          )}
        </div>
        <div>
          <label htmlFor={"signup_confirm_password"}>confirm password</label>
          <br />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Input
                id="signup_confirm_password"
                type="password"
                value={value}
                onChange={onChange}
                placeholder="Password confirm"
              />
            )}
            rules={{
              required: "Password is required",
              validate: (value: string) => value === watch("password"),
            }}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <FormError>password is not matched</FormError>
            )}
        </div>
        <div>
          <Controller
            name="term"
            control={control}
            defaultValue={false}
            render={({ onChange, value }) => (
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              >
                Lorem ipsum dolor sit amet, consectetur
              </Checkbox>
            )}
            rules={{
              required: "You must agree term",
            }}
          />
          {errors.term?.message && (
            <FormError>{errors.term?.message}</FormError>
          )}
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
