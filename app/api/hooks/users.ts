import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile, updateUser } from "@/app/api/https";

export const useGetProfile = (enabled: boolean) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    select: (res) => res.data.data.user,
    enabled,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: {
      userId: string;
      data: { username: string; name: string };
    }) => updateUser(data.userId, data.data),
  });
};
