"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.cookie = "theme=" + (next ? "dark" : "light") + ";path=/;max-age=31536000";
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-black ${
        dark
          ? "border-black bg-black dark:border-white dark:bg-white"
          : "border-neutral-300 bg-transparent dark:border-neutral-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-black ${
          dark
            ? "translate-x-[1.35rem] bg-white dark:bg-black"
            : "translate-x-[0.2rem] bg-black dark:bg-white"
        }`}
      />
    </button>
  );
}
