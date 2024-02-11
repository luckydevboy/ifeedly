import React from "react";
import Header from "./Header";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="p-4 lg:p-0 lg:grid grid-cols-5 gap-6 lg:py-6">
        <LeftSide className="col-span-1 hidden lg:block" />
        <div className="col-span-3">{children}</div>
        <RightSide className="col-span-1 hidden lg:block" />
      </div>
    </div>
  );
}
