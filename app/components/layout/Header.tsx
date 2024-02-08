"use client";

import Image from "next/image";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  BellIcon,
  HomeIcon,
  InboxIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { CreatePostModal } from "@/app/components";
import { Fragment, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetProfile } from "@/app/api/hooks";
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

export default function Header() {
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [mobileMenuIsOpen, setMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { data: profile, isLoading } = useGetProfile(Boolean(session));

  useClickAway(mobileMenuRef, () => {
    setMobileMenu(false);
  });

  return (
    <header className="border-b border-seaSalt flex items-center justify-between px-8 py-4 gap-x-4 sticky top-0 z-10 bg-white">
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
      <Bars3Icon
        className="w-6 h-6 lg:hidden text-davysGray"
        onClick={() => setMobileMenu(true)}
      />
      {status === "loading" ? (
        <></>
      ) : session ? (
        <>
          <div className="flex items-center gap-x-6">
            <button
              className="flex items-center gap-x-2 bg-cornflowerBlue text-white px-4 py-2 rounded-lg"
              onClick={() => setCreateModalIsOpen(true)}
            >
              <PlusIcon className="text-white w-5 h-5" /> Create
            </button>
            {/* TODO: make it a ui component */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="block">
                {profile?.image ? (
                  <img
                    src={profile.image}
                    className="h-10 w-10 overflow-hidden rounded-full"
                    alt="Profile"
                  />
                ) : (
                  <UserCircleIcon className="w-10 h-10 text-davysGray" />
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`${
                            active
                              ? "bg-cornflowerBlue text-white"
                              : "text-cornflowerBlue"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={`${
                            active
                              ? "bg-cornflowerBlue text-white"
                              : "text-cornflowerBlue"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                        >
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/*<InboxIcon className="w-6 h-6 text-davysGray" />*/}
            {/*<div className="border-r border-antiFlashWhite h-6 w-1" />*/}
            {/*<BellIcon className="w-6 h-6 text-davysGray" />*/}
          </div>
        </>
      ) : (
        <Link
          className="bg-cornflowerBlue text-white px-4 py-2 rounded-lg hover:bg-cornflowerBlue/90"
          href={`/sign-in?callbackUrl=${pathname}`}
        >
          Login
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
      <CreatePostModal
        isOpen={createModalIsOpen}
        onClose={() => setCreateModalIsOpen(false)}
      />
    </header>
  );
}
