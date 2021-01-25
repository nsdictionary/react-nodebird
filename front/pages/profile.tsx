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
} from "../store/constants";

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

export default Profile;
