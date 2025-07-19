"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogOut } from "lucide-react";
// import { useEffect } from "react";
// import { useEffect } from "react";

const LoginRegisterButton = () => {
  const session = useSession();
  const userLoading = session.status === "loading";
  const userAuthenticated = session.status === "authenticated";
  const userUnAuthenticated = session.status === "unauthenticated";

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/sign-in" });
  };

  if (userLoading) {
    return (
      <button className="hidden gap-x-1 rounded-sm bg-white px-4 py-2 text-sm font-semibold leading-4 tracking-wide text-blue-900 md:flex lg:py-1.5 lg:text-base">
        Loading
      </button>
    );
  }
  if (userAuthenticated) {
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
  if (userUnAuthenticated) {
    return (
      <button className="hidden gap-x-1 rounded-sm bg-white px-4 py-2 text-sm font-semibold leading-4 tracking-wide text-blue-900 md:flex lg:py-1.5 lg:text-base">
        <Link href={"/auth/sign-in"}>Sign in</Link> /<Link href={"/auth/sign-up"}>Register</Link>
      </button>
    );
  }
};

export default LoginRegisterButton;
