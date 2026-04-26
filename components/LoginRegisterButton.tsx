"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const LoginRegisterButton = () => {
  const auth = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  if (auth.isPending) {
    return (
      <button className="hidden gap-x-1 rounded-sm bg-white px-4 py-2 text-sm font-semibold leading-4 tracking-wide text-blue-900 md:flex lg:py-1.5 lg:text-base">
        Loading
      </button>
    );
  }
  if (auth.data) {
    return (
      <button
        onClick={handleSignOut}
        className="hidden gap-x-1 rounded-sm bg-white px-4 py-2 text-sm font-semibold leading-4 tracking-wide text-blue-900 md:flex lg:py-1.5 lg:text-base"
      >
        <LogOut size={18} />
        Signout
      </button>
    );
  }
  if (!auth.data) {
    return (
      <button className="hidden gap-x-1 rounded-sm bg-white px-4 py-2 text-sm font-semibold leading-4 tracking-wide text-blue-900 md:flex lg:py-1.5 lg:text-base">
        <Link href={"/auth/sign-in"}>Sign in</Link> /<Link href={"/auth/sign-up"}>Register</Link>
      </button>
    );
  }
};

export default LoginRegisterButton;
