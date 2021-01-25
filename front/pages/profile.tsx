import React, { useCallback, useEffect, useState } from "react";
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
import useSWR from "swr";

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: IState) => state.user);
  const router = useRouter();

  const [followingsLimit, setFollowingsLimit] = useState<number>(3);
  const [followersLimit, setFollowersLimit] = useState<number>(3);
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher
  );
  const { data: followersData, error: followerError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher
  );

  useEffect(() => {
    if (!(me && me.id)) {
      router.push("/");
    }
  }, [me && me.id]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_FOLLOWERS_REQUEST,
  //   });
  //   dispatch({
  //     type: LOAD_FOLLOWINGS_REQUEST,
  //   });
  // }, []);

  if (!me) {
    return "내 정보 로딩중...";
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return "팔로잉/팔로워 로딩 중 에러가 발생했습니다.";
  }

  return (
    <AppLayout>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        // data={me.Followings}
        data={followingsData}
        onClickMore={loadMoreFollowings}
        loading={!followingError && !followingsData}
      />
      <FollowList
        header="팔로워"
        // data={me.Followers}
        data={followersData}
        onClickMore={loadMoreFollowers}
        loading={!followerError && !followersData}
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
