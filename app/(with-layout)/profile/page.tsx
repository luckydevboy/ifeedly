"use client";

import { useGetProfile, useUpdateUser } from "@/app/api/hooks";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/app/components/ui";

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
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-davysGray"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              value={formData.name}
              onChange={handleChange}
              id="name"
              name="name"
              type="text"
              disabled={isLoading || updateUser.isPending}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-davysGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-davysGray focus:ring-2 focus:ring-inset focus:ring-cornflowerBlue sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-davysGray"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              value={formData.username}
              onChange={handleChange}
              id="username"
              name="username"
              type="text"
              disabled={isLoading || updateUser.isPending}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-davysGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-davysGray focus:ring-2 focus:ring-inset focus:ring-cornflowerBlue sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/*<div>*/}
        {/*  <label*/}
        {/*    htmlFor="password"*/}
        {/*    className="block text-sm font-medium leading-6 text-davysGray"*/}
        {/*  >*/}
        {/*    Password*/}
        {/*  </label>*/}
        {/*  <div className="mt-2">*/}
        {/*    <input*/}
        {/*      value={formData.password}*/}
        {/*      onChange={handleChange}*/}
        {/*      id="password"*/}
        {/*      name="password"*/}
        {/*      type="password"*/}
        {/*      className="block w-full rounded-md border-0 px-3 py-1.5 text-davysGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-davysGray focus:ring-2 focus:ring-inset focus:ring-cornflowerBlue sm:text-sm sm:leading-6"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <Button type="submit">Edit</Button>
      </div>
    </form>
  );
}
