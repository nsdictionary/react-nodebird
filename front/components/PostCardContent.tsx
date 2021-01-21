import React from "react";
import Link from "next/link";

interface IProps {
  postData: string;
}

const PostCardContent = ({ postData }: IProps) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v) => {
        if (v.match(/(#[^\s]+)/)) {
          return (
            <Link
              href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
              as={`/hashtag/${v.slice(1)}`}
              key={v}
            >
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

export default PostCardContent;
