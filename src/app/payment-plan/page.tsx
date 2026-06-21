import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import * as store from "@/lib/store";
import { selectPlan } from "@/lib/actions";

const plans = [
  {
    id: "basic" as const,
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "Perfect for individual creators getting started with automated replies.",
    features: [
      "Up to 2 YouTube channels",
      "500 automated replies/month",
      "Basic AI personality",
      "Email support",
    ],
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing channels that need more power and flexibility.",
    features: [
      "Up to 5 YouTube channels",
      "5,000 automated replies/month",
      "Advanced AI personality",
      "Custom reply rules",
      "Priority email support",
    ],
  },
  {
    id: "corporate" as const,
    name: "Corporate",
    price: "$99",
    period: "/month",
    description: "For teams and businesses managing multiple channels at scale.",
    features: [
      "Unlimited YouTube channels",
      "Unlimited automated replies",
      "Full AI customization",
      "Team collaboration",
      "Dedicated account manager",
      "Phone & email support",
    ],
  },
];

export default async function PaymentPlanPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const user = await store.users.getUserById(session.userId);
  if (!user) redirect("/");
  if (user.plan) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10 border-b border-neutral-200 dark:border-neutral-800">
        <span className="text-lg font-semibold tracking-tight text-black dark:text-white">
          Replyify
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-16 sm:py-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
            Choose your plan
          </h1>
          <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400">
            Select the plan that fits your needs. You can upgrade or change your
            plan at any time.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-5xl w-full">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-6"
            >
              <h2 className="text-lg font-semibold text-black dark:text-white">
                {plan.name}
              </h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-black dark:text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {plan.period}
                </span>
              </div>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {plan.description}
              </p>
              <ul className="mt-6 space-y-2 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    <svg
                      className="mt-0.5 w-4 h-4 shrink-0 text-black dark:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <form action={selectPlan.bind(null, plan.id)} className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
                >
                  Select {plan.name}
                </button>
              </form>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
