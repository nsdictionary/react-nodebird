import React, { useCallback } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const followingsData = [
    { nickname: "sam" },
    { nickname: "aden" },
    { nickname: "bia" },
  ];
  const followersData = [
    { nickname: "sam" },
    { nickname: "aden" },
    { nickname: "bia" },
  ];
  const loadMoreFollowings = useCallback(() => {
    return true;
  }, []);
  const loadMoreFollowers = useCallback(() => {
    return true;
  }, []);
  const followingError = false;
  const followerError = false;

  return (
    <AppLayout>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="following list"
        data={followingsData}
        onClickMore={loadMoreFollowings}
        loading={!followingsData && !followingError}
      />
      <FollowList
        header="follower list"
        data={followersData}
        onClickMore={loadMoreFollowers}
        loading={!followersData && !followerError}
      />
    </AppLayout>
  );
};

export default Profile;
