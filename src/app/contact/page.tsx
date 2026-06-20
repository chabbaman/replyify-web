"use client";

import Link from "next/link";
import { sendContactMessage } from "@/lib/actions";
import { useRef, useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const result = await sendContactMessage({ name, email, subject, message });
    if (result.error) {
      setError(result.error);
    } else {
      setSent(true);
      formRef.current?.reset();
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight text-black dark:text-white">
          Replyify
        </Link>
        <Link
          href="/faq"
          className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          FAQ
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white mb-2">Contact Us</h1>
          <p className="text-sm text-neutral-500 mb-8">
            Have a question or feedback? Send us a message.
          </p>

          {sent ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-black dark:text-white mb-2">Message sent!</p>
              <p className="text-sm text-neutral-500 mb-6">We&apos;ll get back to you as soon as possible.</p>
              <button
                onClick={() => setSent(false)}
                className="px-6 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
              >
                Send another
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm resize-none"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full py-2.5 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </main>

      <footer>
        <div className="h-px bg-black dark:bg-white opacity-10" />
        <div className="py-6 px-6 sm:px-10 flex items-center justify-between">
          <span className="text-xs text-neutral-400">Replyify</span>
        </div>
      </footer>
    </div>
  );
}
