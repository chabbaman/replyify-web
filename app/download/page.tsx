import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

const downloadOptions = [
  {
    title: "macOS",
    detail: "Apple Silicon and Intel builds",
    cta: "Download for macOS",
  },
  {
    title: "Windows",
    detail: "Windows 11 and Windows 10 (64-bit)",
    cta: "Download for Windows",
  },
  {
    title: "Linux",
    detail: "Ubuntu, Debian, and Fedora packages",
    cta: "Download for Linux",
  },
];

export default function DownloadPage() {
  return (
    <>
      <section className="border-b border-white/10 px-6 py-14 md:px-12 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Download Replyify
        </p>
        <h1 className="mt-5 max-w-3xl font-mono text-3xl font-semibold tracking-tight md:text-5xl">
          Install the desktop app and start replying faster.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Choose your platform below. All downloads include automatic updates and
          secure sign-in with your Replyify account.
        </p>
      </section>

      <section className="grid border-b border-white/10 md:grid-cols-3">
        {downloadOptions.map((option) => (
          <article
            key={option.title}
            className="border-b border-white/10 p-8 md:border-b-0 md:border-r md:border-white/10 md:p-10"
          >
            <h2 className="text-2xl font-semibold">{option.title}</h2>
            <p className="mt-3 text-zinc-400">{option.detail}</p>
            <Button className="mt-8 w-full justify-between">
              {option.cta}
              <Download className="size-4" />
            </Button>
          </article>
        ))}
      </section>

      <section className="px-6 py-12 text-sm text-zinc-400 md:px-12">
        Need enterprise deployment options? Email{" "}
        <a
          href="mailto:support@replyify.app"
          className="text-zinc-200 underline underline-offset-4"
        >
          support@replyify.app
        </a>
        .
      </section>
    </>
  );
}
