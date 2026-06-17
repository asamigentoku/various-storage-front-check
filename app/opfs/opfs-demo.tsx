"use client";

import { useEffect, useState } from "react";

const FILE_NAME = "demo-value.txt";

async function getValue(): Promise<string> {
  const root = await navigator.storage.getDirectory();
  try {
    const fileHandle = await root.getFileHandle(FILE_NAME);
    const file = await fileHandle.getFile();
    return await file.text();
  } catch {
    return "";
  }
}

async function setValue(value: string): Promise<void> {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(FILE_NAME, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(value);
  await writable.close();
}

async function clearValue(): Promise<void> {
  const root = await navigator.storage.getDirectory();
  await root.removeEntry(FILE_NAME).catch(() => {});
}

export default function OpfsDemo() {
  const [value, setStoredValue] = useState("");
  const [input, setInput] = useState("");
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!("storage" in navigator) || !("getDirectory" in navigator.storage)) {
      setSupported(false);
      return;
    }
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

  if (!supported) {
    return (
      <p className="text-zinc-600 dark:text-zinc-400">
        This browser doesn&apos;t support the Origin Private File System.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-zinc-600 dark:text-zinc-400">
        Value written to a file named <code>{FILE_NAME}</code> in the Origin
        Private File System (an actual file on disk, isolated per origin and
        not user-visible):
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
