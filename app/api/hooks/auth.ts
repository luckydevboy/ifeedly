import { useMutation } from "@tanstack/react-query";

import { register } from "@/app/api/https";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: { username: string; password: string; name: string }) =>
      register(data),
  });
};
