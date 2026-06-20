"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { switchAccount } from "@/lib/actions";
import type { YouTubeAccount } from "@/lib/store/types";

type Props = {
  accounts: YouTubeAccount[];
  selectedId: string | null;
};

export default function AccountSwitcher({ accounts, selectedId }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const selected = accounts.find((a) => a.id === selectedId);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(id: string) {
    setOpen(false);
    if (id === "__link__") {
      router.push("/auth/google");
    } else {
      switchAccount(id).then(() => router.refresh());
    }
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-sm text-black dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
      >
        {selected ? (
          <>
            <Image
              src={selected.picture}
              alt=""
              width={18}
              height={18}
              className="rounded-full shrink-0"
            />
            <span className="font-medium truncate max-w-[140px]">
              {selected.name}
            </span>
          </>
        ) : (
          <span className="text-neutral-500">No account</span>
        )}
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform shrink-0 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-64 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-lg z-50">
          <div className="p-1">
            {accounts.length === 0 && (
              <div className="px-3 py-4 text-sm text-neutral-500 text-center">
                No accounts linked
              </div>
            )}
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleSelect(account.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  account.id === selectedId
                    ? "bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white"
                }`}
              >
                <Image
                  src={account.picture}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-full shrink-0"
                />
                <span className="font-medium truncate">{account.name}</span>
                {account.id === selectedId && (
                  <svg
                    className="w-4 h-4 ml-auto shrink-0 text-black dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-1">
            <button
              onClick={() => handleSelect("__link__")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Link another account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
