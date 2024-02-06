"use client";

import { useGetPost } from "@/app/api/hooks";
import { CommentCard, PostCard } from "@/app/components";
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
          <h2 className="text-xl font-bold mb-8">
            {post.comments.length} Comments
          </h2>
          {post.comments.map((comment, index) => (
            <React.Fragment key={comment._id}>
              {index !== 0 && <hr className="border-seaSalt my-4" />}
              <CommentCard {...comment} />
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

export default Post;
