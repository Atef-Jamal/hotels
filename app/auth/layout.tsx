import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession();
  if (session) return redirect("/");
  return <div>{children}</div>;
};

export default layout;
