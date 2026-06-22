import Link from "next/link";

const plans = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "For individual creators getting started with automated replies.",
    features: [
      "Up to 2 YouTube channels",
      "500 automated replies/month",
      "Basic AI personality",
      "Email support",
    ],
  },
  {
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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black stripe-bg">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight text-black dark:text-white">
          Replyify
        </Link>
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          Home
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-16 sm:py-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
            Pricing
          </h1>
          <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400">
            Choose the plan that fits your needs. Upgrade or change anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-5xl w-full">
          {plans.map((plan) => (
            <div
              key={plan.name}
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
              <Link
                href="/signup"
                className="mt-6 block w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
