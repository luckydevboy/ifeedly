"use client";

import Image from "next/image";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { BellIcon, HomeIcon, InboxIcon } from "@heroicons/react/24/outline";
import { CreatePostModal } from "@/app/components";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetProfile } from "@/app/api/hooks/users";
import { useSession } from "next-auth/react";

export default function Header() {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [mobileMenuIsOpen, setMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data: profile, isLoading } = useGetProfile(Boolean(session));

  useClickAway(mobileMenuRef, () => {
    setMobileMenu(false);
  });

  return (
    <header className="border-b border-seaSalt flex items-center justify-between px-8 py-4 gap-x-4 sticky top-0 z-10 bg-white">
      <div className="items-center gap-x-8 hidden lg:flex flex-grow">
        <div className="flex items-center gap-x-4">
          <Image src="/assets/img/logo.png" alt="Logo" width={35} height={35} />
          <div className="font-black text-2xl text-cornflowerBlue">IFeedly</div>
        </div>
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
      {session ? (
        <div className="items-center gap-x-6 hidden lg:flex">
          <button
            className="flex items-center gap-x-2 bg-cornflowerBlue text-white px-4 py-2 rounded-lg"
            onClick={() => setCreateModalIsOpen(true)}
          >
            <PlusIcon className="text-white w-5 h-5" /> Create
          </button>
          {/*<InboxIcon className="w-6 h-6 text-davysGray" />*/}
          {/*<div className="border-r border-antiFlashWhite h-6 w-1" />*/}
          {/*<BellIcon className="w-6 h-6 text-davysGray" />*/}
          <img
            src={profile?.image}
            className="h-10 w-10 overflow-hidden rounded-full"
            alt="Profile"
          />
        </div>
      ) : (
        <Link
          className="bg-cornflowerBlue text-white px-4 py-2 rounded-lg hover:bg-cornflowerBlue/90"
          href={`/api/auth/signin?callbackUrl=${pathname}`}
        >
          Login
        </Link>
      )}

      <Bars3Icon
        className="w-6 h-6 lg:hidden text-davysGray"
        onClick={() => setMobileMenu(true)}
      />
      <button
        className="flex items-center gap-x-2 bg-cornflowerBlue text-white text-sm px-4 py-1.5 rounded-lg lg:hidden"
        onClick={() => setCreateModalIsOpen(true)}
      >
        Create
      </button>
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
              className="absolute z-20 p-4 top-0 w-3/4 h-screen rounded-l-lg bg-white lg:hidden space-y-4"
              ref={mobileMenuRef}
            >
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
                  "flex items-center gap-x-3  px-4 py-2",
                  pathname === "/"
                    ? "bg-ghostWhite text-cornflowerBlue rounded-lg"
                    : "text-davysGray",
                ])}
              >
                <HomeIcon className="w-6 h-6" />
                <span className="font-semibold">Home</span>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <CreatePostModal
        isOpen={createModalIsOpen}
        onClose={() => setCreateModalIsOpen(false)}
      />
    </header>
  );
}
