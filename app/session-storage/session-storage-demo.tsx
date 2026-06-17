"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "demo_value";

export default function SessionStorageDemo() {
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    setValue(sessionStorage.getItem(STORAGE_KEY) ?? "");
  }, []);

  function handleSave() {
    sessionStorage.setItem(STORAGE_KEY, input);
    setValue(input);
    setInput("");
  }

  function handleClear() {
    sessionStorage.removeItem(STORAGE_KEY);
    setValue("");
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-zinc-600 dark:text-zinc-400">
        Value stored in <code>sessionStorage</code> (cleared when the tab
        closes):
      </p>
      <code className="break-all rounded-lg bg-zinc-100 p-3 text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        {value || "(empty)"}
      </code>
      <input
        className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-black outline-none focus:border-black/30 dark:border-white/[.145] dark:text-zinc-50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New value"
      />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 rounded-full bg-foreground px-5 py-3 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 rounded-full border border-black/[.08] px-5 py-3 text-black transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
