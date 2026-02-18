import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { getSignInUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Replyify | AI Replies for YouTube Creators",
  description:
    "Replyify helps YouTube creators automatically draft and send high-quality AI replies to comments.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <div className="relative min-h-screen overflow-clip bg-[#090707] text-zinc-100">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0%,_rgba(9,7,7,0)_45%)]" />
          <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col border-x border-white/10">
            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090707]/80 px-6 py-4 backdrop-blur-md md:px-12">
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/"
                  className="font-mono text-xl font-extrabold tracking-tighter text-white md:text-2xl"
                >
                  replyify
                </Link>

                <nav className="hidden items-center gap-7 lg:flex">
                  <Link
                    href="/#features"
                    className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
                  >
                    Features
                  </Link>
                  <Link
                    href="/#how-it-works"
                    className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
                  >
                    How it works
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/download"
                    className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
                  >
                    Download
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

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
