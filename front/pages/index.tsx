import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/Common/AppLayout";
import PostFrom from "../components/Posts/PostFrom";
import PostCard from "../components/Posts/PostCard";
import { IState } from "../reducers";
import { IPost } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_POSTS_REQUEST } from "../store/constants";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: IState) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state: IState) => state.post
  );

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: mainPosts[mainPosts.length - 1].id,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostFrom />}
      {mainPosts.map((c: IPost) => {
        return <PostCard key={c.id} post={c} />;
      })}
    </AppLayout>
  );
};

export default Home;
