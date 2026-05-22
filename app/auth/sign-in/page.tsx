"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { signInSchema } from "@/lib/validation";
import type { ISignIn } from "@/types";

export default function SignInPage() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, formState } = form;

  const onSubmit = async (data: ISignIn) => {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
  };

  const handleSignInWithProvider = async (provider: "google" | "github") => {
    await authClient.signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <section
      style={{
        minHeight: `calc(100dvh - 66px)`,
      }}
      className="flex items-center justify-center bg-linear-to-b from-[#78c5f8] to-[#fffe]"
    >
      <Card className="w-[90%] rounded-3xl bg-linear-to-b from-[#cadff3] to-[#ffffff] shadow-xl sm:w-[80%] md:w-120">
        <CardHeader className="pt-4 pb-2">
          <CardTitle className="mx-auto">Sign In</CardTitle>
          <CardDescription className="mx-auto">
            Sign in to Hotels and get the most of our services in our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formState.errors.root && (
            <p className="rounded-sm bg-[#d42424d7] p-1 text-center text-sm font-medium text-white sm:text-base">
              {formState.errors.root.message}
            </p>
          )}
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:space-y-3">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <MdEmail className="absolute top-2 left-1" size={23} />
                    <FormControl>
                      <Input {...field} placeholder="Email" className="bg-[#d8cfcf] pl-10 font-bold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <MdPassword className="absolute top-2 left-1" size={23} />
                    <FormControl>
                      <Input {...field} placeholder="Password" className="bg-[#d8cfcf] pl-10 font-bold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex">
                <Link href={"/auth/sign-up"} className="ml-auto text-sm font-bold text-blue-700 underline">
                  Do not have an account
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <p className="w-full text-center font-bold">OR</p>
            </form>
          </Form>
          <div className="flex items-center justify-center gap-x-10">
            <button
              onClick={() => handleSignInWithProvider("google")}
              className="rounded-md border bg-white px-5 py-2"
            >
              <FaGoogle size={25} />
            </button>
            <button
              onClick={() => handleSignInWithProvider("github")}
              className="rounded-md border bg-white px-5 py-2"
            >
              <FaGithub size={25} />
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
