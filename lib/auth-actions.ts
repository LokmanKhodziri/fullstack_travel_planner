"use server";

import { signIn, signOut } from "@/auth";

export const loginWithGoogle = async () => {
  await signIn("google", { redirectTo: "/trips" });
};

export const loginWithGitHub = async () => {
  await signIn("github", { redirectTo: "/trips" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

