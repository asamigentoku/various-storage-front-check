import { cookies } from "next/headers";
import { login, logout } from "./actions";

export default async function Page() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id");

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-6 bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-black/[.08] bg-white p-8 dark:border-white/[.145] dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Cookie Sample
        </h1>

        {sessionId ? (
          <>
            <p className="text-zinc-600 dark:text-zinc-400">
              Logged in. <code>session_id</code> cookie value:
            </p>
            <code className="break-all rounded-lg bg-zinc-100 p-3 text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              {sessionId.value}
            </code>
            <form action={logout}>
              <button
                type="submit"
                className="w-full rounded-full bg-foreground px-5 py-3 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              >
                Log out
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-zinc-600 dark:text-zinc-400">
              No <code>session_id</code> cookie found.
            </p>
            <form action={login}>
              <button
                type="submit"
                className="w-full rounded-full bg-foreground px-5 py-3 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              >
                Log in
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
