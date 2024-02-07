"use client";

import { useCreateComment, useGetPost } from "@/app/api/hooks";
import { Composer, Card } from "@/app/components";
import React from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const Post = ({ params }: { params: { id: string } }) => {
  const { data: post, isLoading, refetch } = useGetPost(params.id);
  const createComment = useCreateComment();

  const handlePostComment = (content: string) => {
    createComment
      .mutateAsync({ content, postId: params.id })
      .then(() => {
        toast.success("Your comment successfully submitted.");
        refetch();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <BeatLoader size={10} color="#7090E8" className="my-4" />
        </div>
      )}
      {post && (
        <div className="mt-4">
          <Card
            {...post}
            reactions={{
              ...post.reactions,
              comments: post.reactions.comments.length,
            }}
            type="post"
          />
          <hr className="border-seaSalt my-4" />
          {post.reactions.comments.length !== 0 && (
            <>
              <h2 className="text-xl font-bold mb-8">
                {post.reactions.comments.length} Comments
              </h2>
              {post.reactions.comments.map((comment, index) => (
                <React.Fragment key={comment._id}>
                  {index !== 0 && <hr className="border-seaSalt my-4" />}
                  <Card
                    {...comment}
                    reactions={{ comments: 0, likes: 0 }}
                    type="comment"
                  />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      )}
      <h2 className="text-xl font-bold mt-16 mb-4">Add Comment</h2>
      <Composer
        onSubmit={handlePostComment}
        isLoading={false}
        placeholder="Type your comment here"
      />
    </>
  );
};

export default Post;
