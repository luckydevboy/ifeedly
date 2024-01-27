import Image from "next/image";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { BellIcon, InboxIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 flex items-center justify-between px-8 py-4">
      <div className="items-center gap-x-8 hidden lg:flex">
        <Image src="/assets/img/logo.png" alt="Logo" width={35} height={35} />
        <div className="bg-zinc-100 rounded-lg px-4 py-2 flex items-center gap-x-2">
          <MagnifyingGlassIcon className="h-6 w-6 text-zinc-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none"
          />
          <div className="w-5 h-5 rounded flex items-center justify-center border border-zinc-400 text-zinc-400 text-sm">
            /
          </div>
        </div>
      </div>
      <div className="items-center gap-x-6 hidden lg:flex">
        <button className="flex items-center gap-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg">
          <PlusIcon className="text-white w-5 h-5" /> Create
        </button>
        <InboxIcon className="w-6 h-6 text-zinc-500" />
        <div className="border-r border-zinc-300 h-6 w-1" />
        <BellIcon className="w-6 h-6 text-zinc-500" />
        <Image
          src="/assets/img/mohammadreza.png"
          width={40}
          height={40}
          className="rounded-full overflow-hidden border-dashed border-zinc-300 border"
          alt="Profile"
        />
      </div>
      <Bars3Icon className="w-6 h-6 lg:hidden" />
    </header>
  );
}
