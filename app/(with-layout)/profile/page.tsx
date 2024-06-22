"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { useGetProfile, useUpdateUser } from "@/app/api/hooks";
import { Button, Input } from "@/app/components/ui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
  name: string;
};

export default function Profile() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Inputs>();
  const { data: profile, isFetching, refetch } = useGetProfile(true);
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (profile) {
      setValue("username", profile.username);
      setValue("name", profile.name);
    }
  }, [profile]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (profile) {
        await updateUser.mutateAsync({ userId: profile._id, data });
        toast.success("Update successfully done.");
        await refetch();
      }
    } catch (error: any) {
      // TODO: Handle errors like this
      if (error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold text-2xl">Profile</h1>
      <hr className="border-seaSalt my-4" />
      <div className="flex flex-col gap-y-6">
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Name"
              disabled={isFetching || updateUser.isPending}
              required
            />
          )}
          name="name"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Username"
              disabled={isFetching || updateUser.isPending}
              required
            />
          )}
          name="username"
          control={control}
        />

        <Button type="submit" isLoading={updateUser.isPending}>
          Edit
        </Button>
      </div>
    </form>
  );
}
