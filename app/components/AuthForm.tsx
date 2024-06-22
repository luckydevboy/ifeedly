"use client";

import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useRegister } from "@/app/api/hooks";
import { Button, Input } from "@/app/components/ui";

type Props = {
  type: "signIn" | "register";
};

type Inputs = {
  username: string;
  password: string;
  name: string;
};

const AuthForm = ({ type }: Props) => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const register = useRegister();
  const [error, setError] = useState(params.get("error") || "");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const urlObj = new URL(window.location.href);
    urlObj.searchParams.delete("error");

    try {
      if (type === "register") {
        await register.mutateAsync(data);
      }
      await signIn("credentials", {
        redirect: true,
        ...data,
        callbackUrl,
      });
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="/assets/img/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="mx-auto mb-4"
          />
          <div className="font-black text-3xl text-cornflowerBlue text-center">
            IFeedly
          </div>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-davysGray">
            {type === "signIn"
              ? "Sign in to your account"
              : "Register a new account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {type === "register" && (
              <Controller
                render={({ field }) => (
                  <Input {...field} type="text" label="Name" required />
                )}
                name="name"
                control={control}
              />
            )}

            <Controller
              render={({ field }) => (
                <Input {...field} type="text" label="Username" required />
              )}
              name="username"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Input {...field} type="password" label="Password" required />
              )}
              name="password"
              control={control}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading || register.isPending}
            >
              {type === "signIn" ? "Sign in" : "Register"}
            </Button>
          </form>
          {error === "CredentialsSignin" ? (
            <div className="text-coquelicot mt-2 text-sm">
              Username or password is wrong!
            </div>
          ) : (
            error && <div className="text-coquelicot mt-2 text-sm">{error}</div>
          )}

          <p className="mt-10 text-center text-sm text-davysGray">
            {type === "signIn" ? "Not a member?" : "Are you a member?"}{" "}
            <Link
              href={type === "signIn" ? "/register" : "/sign-in"}
              className="font-semibold leading-6 text-cornflowerBlue hover:text-vistaBlue"
            >
              {type === "signIn" ? "Register from here" : "Sign in from here"}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
