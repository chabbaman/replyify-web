"use client";

import { useQuery } from "convex/react";
import { makeFunctionReference } from "convex/server";

type PayingStatusResult = {
  externalUserId: string;
  plan: "starter" | "pro" | "scale";
  isPaying: boolean;
  exists: boolean;
};

const getPayingStatus = makeFunctionReference<
  "query",
  { externalUserId: string },
  PayingStatusResult
>("users:getPayingStatus");

export function PricingPlanStatus({ externalUserId }: { externalUserId?: string }) {
  const status = useQuery(
    getPayingStatus,
    externalUserId ? { externalUserId } : "skip"
  );

  if (!externalUserId) {
    return (
      <p className="mt-4 text-sm text-zinc-400">
        Sign in to see your current plan.
      </p>
    );
  }

  if (status === undefined) {
    return <p className="mt-4 text-sm text-zinc-500">Checking your plan...</p>;
  }

  return (
    <p className="mt-4 text-sm text-zinc-300">
      Current plan:{" "}
      <span className="font-semibold text-white">
        {status.plan.charAt(0).toUpperCase() + status.plan.slice(1)}
      </span>
    </p>
  );
}
