"use client";

import { useEffect, useState } from "react";

const CACHE_NAME = "demo-cache";
const REQUEST_URL = "/cache-api-demo-value";

async function getValue(): Promise<string> {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(REQUEST_URL);
  return response ? await response.text() : "";
}

async function setValue(value: string): Promise<void> {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(REQUEST_URL, new Response(value));
}

async function clearValue(): Promise<void> {
  const cache = await caches.open(CACHE_NAME);
  await cache.delete(REQUEST_URL);
}

export default function CacheApiDemo() {
  const [value, setStoredValue] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    getValue().then(setStoredValue);
  }, []);

  async function handleSave() {
    await setValue(input);
    setStoredValue(input);
    setInput("");
  }

  async function handleClear() {
    await clearValue();
    setStoredValue("");
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-zinc-600 dark:text-zinc-400">
        Value stored as a <code>Response</code> body in the <code>Cache</code>{" "}
        Storage API (normally used to cache network requests, e.g. by a
        Service Worker):
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
