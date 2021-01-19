import React from "react";
import Link from "next/link";

interface IProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: IProps) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>Nodebird</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
