"use client";

import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { useGetProfile } from "@/app/api/hooks";
import { Button, DropdownMenu } from "@/app/components/ui";

export default function Header() {
  const [mobileMenuIsOpen, setMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { data: profile } = useGetProfile(Boolean(session));
  const router = useRouter();

  useClickAway(mobileMenuRef, () => {
    setMobileMenu(false);
  });

  return (
    <header className="border-b border-seaSalt flex items-center justify-between px-4 lg:px-8 py-4 gap-x-4 sticky top-0 z-10 bg-white">
      <div className="items-center gap-x-8 hidden lg:flex flex-grow">
        <Link href="/" className="flex items-center gap-x-4">
          <Image src="/assets/img/logo.png" alt="Logo" width={35} height={35} />
          <div className="font-black text-2xl text-cornflowerBlue">IFeedly</div>
        </Link>
        {/*<div className="bg-seaSalt rounded-lg px-4 py-2 flex items-center gap-x-2 flex-grow max-w-[400px]">*/}
        {/*  <MagnifyingGlassIcon className="h-6 w-6 text-davysGray" />*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    placeholder="Search"*/}
        {/*    className="bg-seaSalt outline-none flex-grow"*/}
        {/*  />*/}
        {/*  <div className="w-5 h-5 rounded flex items-center justify-center border botext-davysGray text-davysGray text-sm">*/}
        {/*    /*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className="flex lg:hidden items-center gap-x-4">
        <Bars3Icon
          className="w-6 h-6 text-davysGray"
          onClick={() => setMobileMenu(true)}
        />
        <Link href="/" className="font-black text-2xl text-cornflowerBlue">
          IFeedly
        </Link>
      </div>
      {status === "loading" ? (
        <></>
      ) : session ? (
        <>
          <div className="flex items-center gap-x-6">
            <DropdownMenu
              list={[
                { title: "Profile", onClick: () => router.push("/profile") },
                { title: "Sign Out", onClick: () => signOut() },
              ]}
            >
              {profile?.image ? (
                <img
                  src={profile.image}
                  className="h-10 w-10 overflow-hidden rounded-full"
                  alt="Profile"
                />
              ) : (
                <Image
                  src="/assets/img/user.png"
                  width={40}
                  height={40}
                  alt="Profile"
                />
              )}
            </DropdownMenu>
          </div>
        </>
      ) : (
        <Link href={`/sign-in?callbackUrl=${pathname}`}>
          <Button>Login</Button>
        </Link>
      )}
      <AnimatePresence>
        {mobileMenuIsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed z-10 inset-0 bg-black lg:hidden"
            ></motion.div>
            <motion.div
              initial={{ left: "-75%" }}
              animate={{ left: 0 }}
              exit={{ left: "-75%" }}
              className="absolute z-20 p-4 top-0 w-3/4 h-svh rounded-l-lg bg-white lg:hidden"
              ref={mobileMenuRef}
            >
              <div className="h-full space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-x-4 mb-12">
                    <Image
                      src="/assets/img/logo.png"
                      alt="Logo"
                      width={35}
                      height={35}
                    />
                    <div className="font-black text-2xl text-cornflowerBlue">
                      IFeedly
                    </div>
                  </div>
                  <Link
                    href="/"
                    className={cx([
                      "flex items-center gap-x-3 px-4 py-2",
                      pathname === "/"
                        ? "bg-ghostWhite text-cornflowerBlue rounded-lg"
                        : "text-davysGray",
                    ])}
                  >
                    <HomeIcon className="w-6 h-6" />
                    <span className="font-semibold">Home</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
