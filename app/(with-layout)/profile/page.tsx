"use client";

import { useGetProfile, useUpdateUser } from "@/app/api/hooks";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Input } from "@/app/components/ui";

export default function Profile() {
  const { data: profile, isLoading, refetch } = useGetProfile(true);
  const updateUser = useUpdateUser();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile?.username,
        name: profile?.name,
      });
    }
  }, [profile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (Object.values(formData).some((field) => !Boolean(field))) {
        return toast.error("At least one field is required!");
      }

      if (profile) {
        await updateUser.mutateAsync({ userId: profile._id, data: formData });
        toast.success("Update successfully done.");
        refetch();
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
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold text-2xl">Profile</h1>
      <hr className="border-seaSalt my-4" />
      <div className="flex flex-col gap-y-6">
        <Input
          value={formData.name}
          onChange={handleChange}
          id="name"
          name="name"
          type="text"
          disabled={isLoading || updateUser.isPending}
          label="Name"
        />

        <Input
          value={formData.username}
          onChange={handleChange}
          id="username"
          name="username"
          type="text"
          disabled={isLoading || updateUser.isPending}
          label="Username"
        />

        <Button type="submit">Edit</Button>
      </div>
    </form>
  );
}
