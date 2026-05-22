import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (session) return redirect("/");

  return <div>{children}</div>;
}
