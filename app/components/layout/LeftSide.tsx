"use client";

import { cx } from "class-variance-authority";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftSide({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <aside className={cx([className, "px-4 space-y-4"])}>
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
    </aside>
  );
}
