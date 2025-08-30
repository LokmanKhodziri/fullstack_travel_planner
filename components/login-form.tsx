"use client";

import { loginWithGoogle, loginWithGitHub } from "@/lib/auth-actions";

export default function LoginForm() {
  return (
    <div className="space-y-4">
      <button
        onClick={() => loginWithGoogle()}
        className="w-full bg-red-600 text-white py-2 rounded-md"
      >
        Login with Google
      </button>
      <button
        onClick={() => loginWithGitHub()}
        className="w-full bg-gray-800 text-white py-2 rounded-md"
      >
        Login with GitHub
      </button>
    </div>
  );
}