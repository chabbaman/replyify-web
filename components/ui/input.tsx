import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-md border border-white/10 bg-zinc-950/70 px-3 py-1 text-base text-zinc-100 placeholder:text-zinc-500 outline-none transition-[border,box-shadow] focus-visible:border-zinc-400/70 focus-visible:ring-2 focus-visible:ring-zinc-300/20 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
