import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  getPosts,
  createPost,
  likePost,
  getPost,
  createComment,
} from "../https";

// TODO: use arrow function
export function useGetPosts() {
  const pageSize = 10;
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts({ page: Number(pageParam), pageSize }),
    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.reduce(
        (acc, curr) => curr.data.data.posts.length + acc,
        0,
      );
      const totalCount = lastPage.data.data.total;

      if (currentTotal < totalCount) {
        const pageNumber = currentTotal / pageSize;
        return pageNumber + 1;
      } else {
        return null;
      }
    },
  });
}

export const useGetPost = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    select: (res) => res.data.data.post,
  });
};

export function useCreatePost() {
  return useMutation({
    mutationFn: (content: string) => createPost(content),
  });
}

export const useLikePost = () => {
  return useMutation({
    mutationFn: (id: string) => likePost(id),
  });
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: (data: { postId: string; content: string }) =>
      createComment(data.postId, data.content),
  });
};
