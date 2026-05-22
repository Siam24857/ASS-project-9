"use client";

import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return (
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  );
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

/* =========================
   SESSION (USE THIS ONLY)
========================= */

export const useSession = authClient.useSession;
export const getSession = authClient.getSession;

/* =========================
   SAFE FETCH (NO TOKEN)
========================= */

export const authenticatedFetch = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });
};

/* =========================
   AUTH ACTIONS
========================= */

export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const signOut = authClient.signOut;

export default authClient;