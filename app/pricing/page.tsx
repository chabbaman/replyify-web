import { redirect } from "next/navigation";
import { Check } from "lucide-react";
import { getSignInUrl, withAuth } from "@workos-inc/authkit-nextjs";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

import { PricingPlanStatus } from "@/components/pricing-plan-status";
import { buttonVariants } from "@/components/ui/button";

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

async function updateCurrentUserPlan(formData: FormData) {
  "use server";

  const selectedPlan = formData.get("plan");
  if (
    selectedPlan !== "starter" &&
    selectedPlan !== "pro" &&
    selectedPlan !== "scale"
  ) {
    throw new Error("Invalid plan selected.");
  }

  const { user } = await withAuth();
  if (!user) {
    const signInUrl = await getSignInUrl();
    redirect(signInUrl);
  }

  const convexSiteUrl = process.env.CONVEX_BILLING_SITE_URL;
  const billingWebhookSecret = process.env.BILLING_WEBHOOK_SECRET;

  if (!convexSiteUrl || !billingWebhookSecret) {
    throw new Error(
      "Missing CONVEX_BILLING_SITE_URL or BILLING_WEBHOOK_SECRET in replyify-web env."
    );
  }

  const response = await fetch(
    `${convexSiteUrl}/billing/update-paying-status`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${billingWebhookSecret}`,
      },
      body: JSON.stringify({
        externalUserId: user.id,
        plan: selectedPlan,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to mark user as paying (${response.status}): ${errorText}`
    );
  }

  redirect("/pricing?updated=1");
}

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
              <h2 className="text-2xl font-semibold text-zinc-100">{tier.name}</h2>
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
              {tier.slug === currentPlan ? (
                <button
                  type="button"
                  disabled
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full cursor-default opacity-80",
                  })}
                >
                  Current plan
                </button>
              ) : (
                <form action={updateCurrentUserPlan}>
                  <input type="hidden" name="plan" value={tier.slug} />
                  <button
                    type="submit"
                    className={buttonVariants({
                      variant: tier.ctaVariant,
                      className: "w-full",
                    })}
                  >
                    {tier.cta === "Contact us" ? "Switch to Scale" : tier.cta}
                  </button>
                </form>
              )}
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
    </>
  );
}
