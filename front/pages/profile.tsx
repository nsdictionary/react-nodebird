import React, { useCallback, useEffect } from "react";
import AppLayout from "../components/Common/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/Profile/NicknameEditForm";
import FollowList from "../components/Profile/FollowList";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../reducers";
import { useRouter } from "next/router";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_MY_INFO_REQUEST,
} from "../store/constants";
import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from "@redux-saga/core";

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: IState) => state.user);
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  const loadMoreFollowings = useCallback(() => {
    return true;
  }, []);
  const loadMoreFollowers = useCallback(() => {
    return true;
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        data={me.Followings}
        onClickMore={loadMoreFollowings}
        loading={false}
      />
      <FollowList
        header="팔로워"
        data={me.Followers}
        onClickMore={loadMoreFollowers}
        loading={false}
      />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context: any) => {
    console.log("getServerSideProps start");
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log("getServerSideProps end");
    await context.store.sagaTask.toPromise();
  }
);

export default Profile;
