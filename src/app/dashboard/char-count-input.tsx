"use client";

import { useState } from "react";

export default function CharCountInput({
  id,
  name,
  label,
  maxLength,
  defaultValue,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  maxLength: number;
  defaultValue: string;
  placeholder: string;
}) {
  const [len, setLen] = useState(defaultValue.length);

  return (
    <div>
      <label htmlFor={id} className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        maxLength={maxLength}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => setLen(e.target.value.length)}
        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-2.5 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
      />
      <p className="mt-1 text-xs text-neutral-400 text-right">
        {len}/{maxLength}
      </p>
    </div>
  );
}
