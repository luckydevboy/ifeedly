"use client";

import { useGetPost } from "@/app/api/hooks";
import { PostCard } from "@/app/components";
import React from "react";
import { BeatLoader } from "react-spinners";

const Post = ({ params }: { params: { id: string } }) => {
  const { data: post, isLoading } = useGetPost(params.id);
  return (
    <>
      {isLoading && (
        <div className="text-center">
          <BeatLoader size={10} color="#7090E8" className="my-4" />
        </div>
      )}
      {post && (
        <>
          <PostCard {...post} />
          <hr className="border-seaSalt my-4" />
        </>
      )}
    </>
  );
};

export default Post;
