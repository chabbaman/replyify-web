import { Check } from "lucide-react";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

import { PricingPlanStatus } from "@/components/pricing-plan-status";
import { SubscribeButtonClient } from "@/components/subscribe-button-client";

const tiers = [
  {
    slug: "starter",
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
    slug: "pro",
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
    slug: "scale",
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

type Plan = "starter" | "pro" | "scale";

type PayingStatusResult = {
  externalUserId: string;
  plan: Plan;
  isPaying: boolean;
  exists: boolean;
};

const getPayingStatus = makeFunctionReference<
  "query",
  { externalUserId: string },
  PayingStatusResult
>("users:getPayingStatus");

export default async function Pricing() {
  const { user } = await withAuth();
  let currentPlan: Plan = "starter";

  if (user) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.VITE_CONVEX_URL;
    if (convexUrl) {
      const client = new ConvexHttpClient(convexUrl);
      try {
        const status = await client.query(getPayingStatus, {
          externalUserId: user.id,
        });
        currentPlan = status.plan;
      } catch {
        currentPlan = "starter";
      }
    }
  }

  return (
    <>
      <section className="border-b border-white/10 px-6 py-16 md:px-12 md:py-24">
        <h1 className="font-mono text-3xl font-semibold tracking-tight md:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Pick the plan that fits your channel. Scale up anytime as your audience
          grows.
        </p>
        <PricingPlanStatus externalUserId={user?.id} />
      </section>

      <section className="grid gap-0 border-b border-white/10 md:grid-cols-3">
        <SubscribeButtonClient tiers={tiers} currentPlan={currentPlan} />
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
    </>
  );
}
