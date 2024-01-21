"use client";

import { Card, Composer } from "@/app/components";
import React from "react";
import { useGetFeed, usePostFeed } from "@/app/apis/hooks";
import toast from "react-hot-toast";

export default function Home() {
  const { data: feed, refetch } = useGetFeed();
  const postFeed = usePostFeed();

  const addNewPost = (content: string) => {
    postFeed.mutateAsync({ content }).then(() => {
      toast.success("Your post successfully sent.");
      refetch();
    });
  };

  return (
    <main className="space-y-4">
      <Composer onSubmit={addNewPost} isLoading={postFeed.isPending} />
      {feed?.map((post, index) => (
        <React.Fragment key={post.id}>
          {index !== 0 && <hr className="border-zinc-200" />}
          <Card {...post} />
        </React.Fragment>
      ))}
    </main>
  );
}
