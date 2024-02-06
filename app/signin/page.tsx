"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

const Auth = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const error = params.get("error") || "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      ...formData,
      callbackUrl,
    });
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-davysGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-davysGray focus:ring-2 focus:ring-inset focus:ring-cornflowerBlue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-davysGray"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-cornflowerBlue hover:text-vistaBlue"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-davysGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-davysGray focus:ring-2 focus:ring-inset focus:ring-cornflowerBlue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cornflowerBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-vistaBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cornflowerBlue disabled:bg-cornflowerBlue/40"
              >
                Sign in
              </button>
            </div>
            {error === "CredentialsSignin" && (
              <div className="text-coquelicot">
                Username or password is wrong!
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-davysGray">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-cornflowerBlue hover:text-vistaBlue"
            >
              Register from here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;
