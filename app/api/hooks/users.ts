import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/app/api/https/users";

export const useGetProfile = (enabled: boolean) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    select: (res) => res.data.data.user,
    enabled,
  });
};
