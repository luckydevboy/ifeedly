import { useMutation, useQuery } from "@tanstack/react-query";
import { getFeed, postFeed } from "@/app/apis/https/feed";
import { Post } from "@/app/lib/definitions";

export function useGetFeed() {
  return useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
    select: (res) => res.data,
  });
}

export function usePostFeed() {
  return useMutation({
    mutationFn: (data: Omit<Post, "id" | "reactions">) => postFeed(data),
  });
}
