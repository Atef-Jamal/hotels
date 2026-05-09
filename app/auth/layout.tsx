import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const getHeaders = await headers();

  const session = await auth.api.getSession({
    headers: getHeaders,
  });

  if (session) return redirect("/");

  return <div>{children}</div>;
};

export default Layout;
