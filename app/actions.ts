"use server";

import { cookies } from "next/headers";

const SESSION_COOKIE = "session_id";

export async function login() {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, crypto.randomUUID(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
