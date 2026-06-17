import SessionStorageDemo from "./session-storage-demo";

export default function Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-6 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-black/[.08] bg-white p-8 dark:border-white/[.145] dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          sessionStorage Sample
        </h1>
        <SessionStorageDemo />
      </main>
    </div>
  );
}
