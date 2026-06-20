"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/actions";

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white text-center">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 text-center">
          Sign up to get started with Replyify.
        </p>

        <form action={formAction} className="mt-8 space-y-4">
          {state?.error && (
            <p className="text-sm text-red-500 text-center">{state.error}</p>
          )}
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Name"
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-2.5 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-2.5 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="Password"
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-2.5 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              placeholder="Confirm password"
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-2.5 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
          >
            {pending ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link href="/login" className="text-black dark:text-white hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
