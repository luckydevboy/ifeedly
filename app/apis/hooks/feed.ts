import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getFeed, postFeed } from "@/app/apis/https/feed";

export function useGetFeed() {
  const pageSize = 10;
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => getFeed({ page: Number(pageParam), pageSize }),
    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.reduce(
        (acc, curr) => curr.data.data.length + acc,
        0,
      );
      const totalCount = lastPage.data.total;

      if (currentTotal < totalCount) {
        const pageNumber = currentTotal / pageSize;
        return pageNumber + 1;
      } else {
        return null;
      }
    },
  });
}

export function usePostFeed() {
  return useMutation({
    mutationFn: (content: string) => postFeed(content),
  });
}
