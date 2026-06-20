"use client";

import { useRef, useEffect, useState } from "react";
import { signOut } from "@/lib/actions";

type Props = {
  name: string;
  email: string;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UserMenu({ name, email }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={menuRef} className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center"
      >
        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
          {getInitials(name)}
        </span>
      </button>

      {open && (
        <div className="absolute bottom-12 right-0 w-56 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-lg">
          <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-900">
            <p className="text-sm font-medium text-black dark:text-white truncate">
              {name}
            </p>
            <p className="text-xs text-neutral-400 truncate mt-0.5">
              {email}
            </p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2.5 text-sm text-neutral-600 hover:text-black hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900 rounded-b-xl transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
