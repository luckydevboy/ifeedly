"use client";

import { Card, Composer } from "@/app/components";
import React from "react";
import { useGetPosts, useCreatePost } from "@/app/api/hooks";
import toast from "react-hot-toast";
import { Post } from "@/app/lib/definitions";
import InfiniteScroll from "react-infinite-scroll-component";
import { BeatLoader } from "react-spinners";

export default function Home() {
  const { data, isFetching, hasNextPage, fetchNextPage, refetch } =
    useGetPosts();
  const createPost = useCreatePost();

  const posts = data?.pages.reduce(
    (acc: Post[], page) => acc.concat(page.data.data.posts),
    [],
  );

  const addNewPost = (content: string) => {
    createPost.mutateAsync(content).then(() => {
      toast.success("Your post successfully sent.");
      refetch();
    });
  };

  return (
    <main className="space-y-4">
      <Composer
        onSubmit={addNewPost}
        isLoading={createPost.isPending}
        placeholder="Share your knowledge..."
      />
      {isFetching && (
        <div className="text-center">
          <BeatLoader size={10} color="#7090E8" className="my-4" />
        </div>
      )}
      <InfiniteScroll
        dataLength={posts?.length || 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          isFetching && (
            <div className="text-center">
              <BeatLoader size={10} color="#7090E8" className="my-4" />
            </div>
          )
        }
      >
        {posts?.map((post, index) => (
          <div className="mt-4 space-y-4" key={post._id}>
            {index !== 0 && <hr className="border-seaSalt" />}
            <Card {...post} type="post" />
          </div>
        ))}
      </InfiniteScroll>
    </main>
  );
}
