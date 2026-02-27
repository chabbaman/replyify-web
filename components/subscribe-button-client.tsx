"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Plan = "starter" | "pro" | "scale";

interface PlanButtonProps {
  plan: {
    slug: Plan;
    name: string;
    price: string;
    cta: string;
    ctaVariant: "outline" | "default";
  };
  isCurrentPlan: boolean;
}

function PlanButton({ plan, isCurrentPlan }: PlanButtonProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          plan: plan.slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isCurrentPlan) {
    return (
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className={buttonVariants({
          variant: plan.ctaVariant,
          className: "w-full",
        })}
      >
        {loading ? "Processing..." : plan.cta}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && (
        <p className="text-sm text-green-400">
          Success! Your {plan.name} plan has been activated.
        </p>
      )}
    </form>
  );
}

interface SubscribeButtonClientProps {
  tiers: Array<{
    slug: Plan;
    name: string;
    price: string;
    highlight: boolean;
    features: string[];
    cta: string;
    ctaVariant: "outline" | "default";
  }>;
  currentPlan: Plan;
}

export function SubscribeButtonClient({
  tiers,
  currentPlan,
}: SubscribeButtonClientProps) {
  return (
    <>
      {tiers.map((tier, i) => (
        <div
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
                <svg
                  className="mt-0.5 size-4 shrink-0 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <PlanButton
              plan={{
                slug: tier.slug,
                name: tier.name,
                price: tier.price,
                cta: tier.cta,
                ctaVariant: tier.ctaVariant,
              }}
              isCurrentPlan={tier.slug === currentPlan}
            />
          </div>
        </div>
      ))}
    </>
  );
}
