import React from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/Common/AppLayout";
import PostFrom from "../components/Posts/PostFrom";
import PostCard from "../components/Posts/PostCard";
import { IState } from "../reducers";
import { IPost } from "../reducers/post";

const Home = () => {
  const { isLoggedIn } = useSelector((state: IState) => state.user);
  const { mainPosts } = useSelector((state: IState) => state.post);

  return (
    <AppLayout>
      {isLoggedIn && <PostFrom />}
      {mainPosts.map((c: IPost) => {
        return <PostCard key={c.id} post={c} />;
      })}
    </AppLayout>
  );
};

export default Home;
