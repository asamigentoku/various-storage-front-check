"use client";

import { useEffect, useState } from "react";

const DB_NAME = "demo-db";
const STORE_NAME = "demo-store";
const KEY = "demo_value";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getValue(): Promise<string> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(KEY);
    request.onsuccess = () => resolve(request.result ?? "");
    request.onerror = () => reject(request.error);
  });
}

async function setValue(value: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(value, KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function clearValue(): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export default function IndexedDbDemo() {
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
        Value stored in <code>IndexedDB</code> (persists across reloads and
        browser restarts):
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
