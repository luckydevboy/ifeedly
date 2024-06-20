"use client";

import { Card, Composer } from "@/app/components";
import React, { useEffect, useRef } from "react";
import { useGetPosts, useCreatePost } from "@/app/api/hooks";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { useVirtualizer } from "@tanstack/react-virtual";
import styles from "./styles.module.css";

export default function Home() {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetPosts();
  const createPost = useCreatePost();

  const allRows = data ? data.pages.flatMap((d) => d.data.data.posts) : [];

  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    overscan: 5,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...items].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage, items]);

  const addNewPost = (content: string) => {
    createPost.mutateAsync(content).then(() => {
      toast.success("Your post successfully sent.");
      refetch();
    });
  };

  return (
    <main>
      <Composer
        onSubmit={addNewPost}
        isLoading={createPost.isPending}
        placeholder="Share your knowledge..."
      />

      {isFetching && !data && (
        <div className="text-center">
          <BeatLoader size={10} color="#7090E8" className="my-4" />
        </div>
      )}

      <div ref={parentRef} className={styles.parent}>
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {items.map((virtualItem) => {
              const isLoaderRow = virtualItem.index > allRows.length - 1;
              const post = allRows[virtualItem.index];
              const isLastRow = virtualItem.index === allRows.length - 1;

              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                >
                  {isLoaderRow ? (
                    hasNextPage ? (
                      <div className="text-center">
                        <BeatLoader
                          size={10}
                          color="#7090E8"
                          className="my-4"
                        />
                      </div>
                    ) : (
                      "Nothing more to load"
                    )
                  ) : (
                    <>
                      <Card {...post} type="post" />
                      {!isLastRow && <hr className="my-6 border-zinc-100" />}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
