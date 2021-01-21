import React from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostFrom from "../components/PostFrom";
import PostCard from "../components/PostCard";
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
