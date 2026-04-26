"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaGithub, FaGoogle, FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  phone: z
    .string()
    .min(2, {
      message: "Phone must be at least 2 characters.",
    })
    .optional(),
});

export type FormSchemaField = z.infer<typeof formSchema>;
const SignUpPage = () => {
  const session = authClient.useSession();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const { handleSubmit, control, formState } = form;

  const onSubmit = async (data: FormSchemaField) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        ...(data.phone ? { phone: data.phone } : {}),
      },
      {
        onError(context) {
          form.setError("root", { message: context.error.message });
        },
        onSuccess() {
          router.push("/");
        },
      },
    );
  };

  if (session.isPending) {
    return <div className="mt-20 text-center text-4xl font-medium">Loading</div>;
  }

  if (session.data) {
    router.push("/");
  }

  return (
    <section
      style={{
        minHeight: `calc(100dvh - 66px)`,
      }}
      className="flex items-center justify-center bg-gradient-to-b from-[#78c5f8] to-[#fffe]"
    >
      <Card className="my-5 w-[90%] rounded-3xl bg-gradient-to-b from-[#cadff3] to-[#ffffff] shadow-xl sm:w-[80%] md:w-[30rem]">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="mx-auto">Sign Up</CardTitle>
          <CardDescription className="mx-auto text-center">
            Sign Up to Hotels and get the most of our services in our platform
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
                name="name"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FaUserEdit className="absolute left-2 top-2" size={22} />
                    <FormControl>
                      <Input placeholder="Name" {...field} className="bg-[#d8cfcf] pl-10 font-bold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <MdEmail className="absolute left-1 top-2" size={23} />
                    <FormControl>
                      <Input placeholder="Email" {...field} className="bg-[#d8cfcf] pl-10 font-bold" />
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
                      <Input placeholder="Password" {...field} className="bg-[#d8cfcf] pl-10 font-bold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Phone className="absolute left-1 top-2" size={23} />
                    <FormControl>
                      <Input placeholder="Phone" {...field} className="bg-[#d8cfcf] pl-10 font-bold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex">
                <Link href={"/auth/sign-in"} className="ml-auto text-sm font-bold text-blue-700 underline">
                  Have an account, Log in
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <p className="w-full text-center font-bold">OR</p>
              <div className="flex items-center justify-center gap-x-10">
                <button className="rounded-md border bg-white px-5 py-2">
                  <FaGoogle size={25} />
                </button>
                <button className="rounded-md border bg-white px-5 py-2">
                  <FaGithub size={25} />
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignUpPage;
