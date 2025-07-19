"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

type FormSchemaField = z.infer<typeof formSchema>;

const SignInPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, formState } = form;

  const onSubmit = async (data: FormSchemaField) => {
    await signIn("credentials", {
      ...data,
      callbackUrl: "/",
    });
  };

  const handleSignInWithProvider = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <section
      style={{
        minHeight: `calc(100dvh - 66px)`,
      }}
      className="flex items-center justify-center bg-gradient-to-b from-[#78c5f8] to-[#fffe]"
    >
      <Card className="w-[90%] rounded-3xl bg-gradient-to-b from-[#cadff3] to-[#ffffff] shadow-xl sm:w-[80%] md:w-[30rem]">
        <CardHeader className="pb-2 pt-4">
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
                    <MdEmail className="absolute left-1 top-2" size={23} />
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
                    <MdPassword className="absolute left-1 top-2" size={23} />
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
};

export default SignInPage;
