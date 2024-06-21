"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { useRegister } from "@/app/api/hooks";
import { Button, Input } from "@/app/components/ui";

type Props = {
  type: "signIn" | "register";
};

const AuthForm = ({ type }: Props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const register = useRegister();
  const [error, setError] = useState(params.get("error") || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    const urlObj = new URL(window.location.href);
    urlObj.searchParams.delete("error");

    e.preventDefault();

    try {
      if (type === "register") {
        await register.mutateAsync(formData);
      }
      await signIn("credentials", {
        redirect: true,
        ...formData,
        callbackUrl,
      });
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {type === "register" && (
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
                    required
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-davysGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-davysGray focus:ring-2 focus:ring-inset focus:ring-cornflowerBlue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            <Input
              value={formData.username}
              onChange={handleChange}
              id="username"
              name="username"
              type="text"
              required
              label="Username"
            />

            <Input
              value={formData.password}
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              label="Password"
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
