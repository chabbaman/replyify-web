import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black px-6 text-center">
      <h1 className="text-5xl font-bold text-black dark:text-white">404</h1>
      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Page not found.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-2.5 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
