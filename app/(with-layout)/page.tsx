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
    error,
    status,
  } = useGetPosts();
  const createPost = useCreatePost();

  const allRows = data ? data.pages.flatMap((d) => d.data.data.posts) : [];

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 176,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

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
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

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

      <div ref={parentRef} className={styles.parent}>
        {/* The large inner element to hold all the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <Card {...allRows[virtualItem.index]} type="post" />
              <hr className="absolute w-full bottom-5 border-zinc-100" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
