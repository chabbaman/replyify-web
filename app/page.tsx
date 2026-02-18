import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  MessageSquare,
  Sparkles,
  Youtube,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSignInUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";

export default async function Home() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  return (
    <div className="relative min-h-screen overflow-clip bg-[#090707] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0%,_rgba(9,7,7,0)_45%)]" />
      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col border-x border-white/10">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090707]/80 px-6 py-4 backdrop-blur-md md:px-12">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-mono text-xl font-extrabold tracking-tighter text-white md:text-2xl"
            >
              replyify
            </Link>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
              <a
                href="#features"
                className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
              >
                How it works
              </a>
              <a
                href="#waitlist"
                className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
              >
                Waitlist
              </a>
              <Link
                href="/pricing"
                className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
              >
                Pricing
              </Link>
            </nav>

            {user ? (
              <form
                className="flex items-center gap-4"
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <div className="hidden items-center gap-3 md:flex">
                  {user.profilePictureUrl && (
                    <Image
                      src={user.profilePictureUrl}
                      alt={user.firstName ?? "User"}
                      width={28}
                      height={28}
                      className="rounded-full ring-2 ring-white/20"
                    />
                  )}
                  <p className="text-sm font-medium text-zinc-400">
                    {user.firstName ?? "creator"}
                  </p>
                </div>
                <Button size="sm" type="submit">
                  Sign Out
                </Button>
              </form>
            ) : (
              <Link href={signInUrl} className={buttonVariants({ size: "sm" })}>
                Sign In
              </Link>
            )}
          </div>
        </header>

        <section className="border-b border-white/10 px-6 py-18 md:px-12 md:py-24">
          <div className="mb-7 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            <span className="bg-zinc-100 px-2 py-0.5 font-semibold text-zinc-900">
              New
            </span>
            Auto-reply to YouTube comments with your voice.
          </div>
          <h1 className="max-w-4xl font-mono text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            The AI comment agent for YouTube creators.
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-400">
            Replyify reviews every incoming comment, drafts a high-quality reply
            in your tone, and publishes automatically or queues for approval.
          </p>
          <div className="mt-12 grid gap-4 sm:flex">
            <Button size="lg" className="text-base">
              Connect YouTube
              <ArrowRight />
            </Button>
            <Button variant="outline" size="lg" className="text-base">
              Watch demo
            </Button>
          </div>
          <div className="mt-14 rounded-lg border border-white/15 bg-[#111010] p-6">
            <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
              <span>Live product preview</span>
              <span>Drop-in demo slot</span>
            </div>
            <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-white/20 bg-black/30 text-zinc-500">
              EMPTY_GIF
            </div>
          </div>
        </section>

        <section
          id="features"
          className="grid gap-0 border-b border-white/10 md:grid-cols-3"
        >
          <article className="border-b border-white/10 p-8 md:border-b-0 md:border-r md:border-white/10 md:p-10">
            <Youtube className="mb-7 size-5 text-zinc-200" />
            <h2 className="text-2xl font-semibold text-zinc-100">
              Native YouTube sync
            </h2>
            <p className="mt-4 text-zinc-400">
              Pulls new comments in real time and keeps every thread statefully
              in context.
            </p>
          </article>
          <article className="border-b border-white/10 p-8 md:border-b-0 md:border-r md:border-white/10 md:p-10">
            <Sparkles className="mb-7 size-5 text-zinc-200" />
            <h2 className="text-2xl font-semibold text-zinc-100">
              Voice-matched replies
            </h2>
            <p className="mt-4 text-zinc-400">
              Trains on your existing comments and scripts to mirror your brand
              tone accurately.
            </p>
          </article>
          <article className="p-8 md:p-10">
            <Bot className="mb-7 size-5 text-zinc-200" />
            <h2 className="text-2xl font-semibold text-zinc-100">
              Guardrails built in
            </h2>
            <p className="mt-4 text-zinc-400">
              Filter spam, block risky claims, and escalate edge cases before
              anything goes live.
            </p>
          </article>
        </section>

        <section
          id="how-it-works"
          className="border-b border-white/10 px-6 py-16 md:px-12 md:py-20"
        >
          <h3 className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
            Built to protect creator time without losing human connection.
          </h3>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            Replyify chooses the right model for each thread, cites context, and
            keeps each answer short, relevant, and on-brand.
          </p>
          <Button variant="outline" className="mt-8">
            <MessageSquare />
            Learn how Replyify works
          </Button>
        </section>

        <section
          id="waitlist"
          className="border-b border-white/10 px-6 py-14 md:px-12"
        >
          <h4 className="text-3xl font-semibold">Get early access</h4>
          <p className="mt-4 text-zinc-400">
            Join creators testing fully automatic replies before public launch.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Email address"
              className="sm:h-12"
            />
            <Button type="submit" className="sm:h-12 sm:px-7">
              Join waitlist
            </Button>
          </form>
        </section>

        <footer className="grid text-sm text-zinc-400 md:grid-cols-4">
          <a
            href="#"
            className="border-b border-white/10 px-6 py-5 transition-colors hover:bg-white/5 hover:text-zinc-200 md:border-b-0 md:border-r md:border-white/10 md:px-12"
          >
            Product
          </a>
          <a
            href="#"
            className="border-b border-white/10 px-6 py-5 transition-colors hover:bg-white/5 hover:text-zinc-200 md:border-b-0 md:border-r md:border-white/10 md:px-12"
          >
            Docs
          </a>
          <a
            href="#"
            className="border-b border-white/10 px-6 py-5 transition-colors hover:bg-white/5 hover:text-zinc-200 md:border-b-0 md:border-r md:border-white/10 md:px-12"
          >
            Changelog
          </a>
          <a
            href="#"
            className="px-6 py-5 transition-colors hover:bg-white/5 hover:text-zinc-200 md:px-12"
          >
            Contact
          </a>
        </footer>
      </main>
    </div>
  );
}
