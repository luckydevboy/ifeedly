import React from "react";

import Layout from "@/app/components/layout";

const NestedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Layout>{children}</Layout>;
};

export default NestedLayout;
