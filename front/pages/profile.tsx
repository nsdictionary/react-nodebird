import React, { useCallback, useEffect } from "react";
import AppLayout from "../components/Common/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/Profile/NicknameEditForm";
import FollowList from "../components/Profile/FollowList";
import { useSelector } from "react-redux";
import { IState } from "../reducers";
import { useRouter } from "next/router";

const Profile = () => {
  const { me } = useSelector((state: IState) => state.user);
  const router = useRouter();

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
        header="following list"
        data={me.Followings}
        onClickMore={loadMoreFollowings}
        loading={false}
      />
      <FollowList
        header="follower list"
        data={me.Followers}
        onClickMore={loadMoreFollowers}
        loading={false}
      />
    </AppLayout>
  );
};

export default Profile;
