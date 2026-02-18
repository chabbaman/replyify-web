import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { getSignInUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";

const tiers = [
  {
    name: "Starter",
    price: "$19",
    highlight: false,
    features: [
      "1 YouTube channel",
      "500 replies/mo",
      "Basic tone matching",
      "Standard guardrails",
      "Email support",
    ],
    cta: "Get started",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$49",
    highlight: true,
    features: [
      "3 YouTube channels",
      "2,000 replies/mo",
      "Advanced tone matching",
      "Standard guardrails",
      "Priority email support",
    ],
    cta: "Get started",
    ctaVariant: "default" as const,
  },
  {
    name: "Scale",
    price: "$149",
    highlight: false,
    features: [
      "Unlimited channels",
      "10,000 replies/mo",
      "Advanced + custom tone matching",
      "Priority + custom guardrail rules",
      "Dedicated support",
    ],
    cta: "Contact us",
    ctaVariant: "outline" as const,
  },
];

export default async function Pricing() {
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
                className="text-sm font-semibold text-white transition-colors hover:text-white"
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

        <section className="border-b border-white/10 px-6 py-16 md:px-12 md:py-24">
          <h1 className="font-mono text-3xl font-semibold tracking-tight md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-400">
            Pick the plan that fits your channel. Scale up anytime as your
            audience grows.
          </p>
        </section>

        <section className="grid gap-0 border-b border-white/10 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <article
              key={tier.name}
              className={`flex flex-col p-8 md:p-10 ${
                i < tiers.length - 1
                  ? "border-b border-white/10 md:border-b-0 md:border-r md:border-white/10"
                  : ""
              } ${tier.highlight ? "bg-white/5" : ""}`}
            >
              <div className="mb-6 flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-zinc-100">
                  {tier.name}
                </h2>
                {tier.highlight && (
                  <span className="bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-900">
                    Most popular
                  </span>
                )}
              </div>

              <p className="mb-8">
                <span className="font-mono text-4xl font-semibold text-white">
                  {tier.price}
                </span>
                <span className="text-zinc-400">/mo</span>
              </p>

              <ul className="mb-10 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-zinc-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link
                  href="#"
                  className={buttonVariants({
                    variant: tier.ctaVariant,
                    className: "w-full",
                  })}
                >
                  {tier.cta}
                </Link>
              </div>
            </article>
          ))}
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
