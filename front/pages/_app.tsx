import React from "react";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";

import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface IProps {
  Component: React.ComponentType;
  pageProps: any;
}

const App = ({ Component, pageProps }: IProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
