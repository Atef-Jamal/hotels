"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function ProfileButton() {
  const auth = authClient.useSession();

  if (auth.isPending) {
    return (
      <Button className="hidden rounded-sm bg-white text-sm leading-4 font-semibold tracking-wide text-blue-900 md:flex">
        Loading
      </Button>
    );
  }
  if (auth.data) {
    return (
      <button
        onClick={() => authClient.signOut()}
        className="hidden rounded-sm bg-white text-sm leading-4 font-semibold tracking-wide text-blue-900 md:flex"
      >
        <LogOut size={18} />
        Signout
      </button>
    );
  }
  if (!auth.data) {
    return (
      <Button className="hidden rounded-sm bg-white text-sm leading-4 font-semibold tracking-wide text-blue-900 md:flex">
        <Link href={"/auth/sign-in"}>Sign in</Link> /<Link href={"/auth/sign-up"}>Register</Link>
      </Button>
    );
  }
}
