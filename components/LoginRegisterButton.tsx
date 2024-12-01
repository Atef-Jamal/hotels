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
  // useEffect(() => {
  //   const ins = setInterval(() => {
  //     console.log();
  //   }, 1000);
  //   return () => clearInterval(ins);
  // }, []);
  if (userLoading) {
    return (
      <span className="animate-pulse hidden md:flex text-sm leading-[18px] font-[700] bg-white py-2 px-4 rounded-sm text-blue-900 tracking-wide">
        Loading
      </span>
    );
  }
  if (userAuthenticated) {
    return (
      <button
        onClick={handleSignOut}
        className="hidden md:flex items-center gap-x-2 text-sm leading-[18px] font-[700] bg-white py-2 px-4 rounded-sm text-blue-900 tracking-wide"
      >
        <LogOut size={18} />
        Signout
      </button>
    );
  }
  if (userUnAuthenticated) {
    return (
      <button className="hidden md:flex gap-x-1 text-sm leading-[18px] font-[700] bg-white py-2 px-4 rounded-sm text-blue-900 tracking-wide">
        <Link href={"/auth/sign-in"}>Sign in</Link> /
        <Link href={"/auth/sign-up"}>Register</Link>
      </button>
    );
  }
};

export default LoginRegisterButton;
