import React from "react";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";

interface IProps {
  Component: React.ComponentType;
}

const App = ({ Component }: IProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(withReduxSaga(App));
