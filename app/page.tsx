"use client";

import { Card, Composer } from "@/app/components";
import React from "react";
import { useGetFeed, usePostFeed } from "@/app/apis/hooks";
import toast from "react-hot-toast";
import { Post } from "@/app/lib/definitions";
import InfiniteScroll from "react-infinite-scroll-component";
import { BeatLoader } from "react-spinners";

export default function Home() {
  const { data, isFetching, hasNextPage, fetchNextPage, refetch } =
    useGetFeed();
  const postFeed = usePostFeed();

  const feed = data?.pages.reduce(
    (acc: Post[], page) => acc.concat(page.data.data),
    [],
  );

  const addNewPost = (content: string) => {
    postFeed.mutateAsync(content).then(() => {
      toast.success("Your post successfully sent.");
      refetch();
    });
  };

  return (
    <main className="space-y-4">
      <Composer onSubmit={addNewPost} isLoading={postFeed.isPending} />
      {isFetching && (
        <div className="text-center">
          <BeatLoader size={10} color="#3b82f6" className="my-4" />
        </div>
      )}
      <InfiniteScroll
        dataLength={feed?.length || 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          isFetching && (
            <div className="text-center">
              <BeatLoader size={10} color="#3b82f6" className="my-4" />
            </div>
          )
        }
        className="space-y-4"
      >
        {feed?.map((post, index) => (
          <React.Fragment key={post.id}>
            {index !== 0 && <hr className="border-zinc-200" />}
            <Card {...post} />
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </main>
  );
}
