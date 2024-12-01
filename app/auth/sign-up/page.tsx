"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaGithub, FaGoogle, FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import { Phone } from "lucide-react";
import { register } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  phone: z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  }),
});

export type FormSchemaField = z.infer<typeof formSchema>;

const SignUpPage = () => {
  const session = useSession();
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
    const response = await register(data);

    if (response.error) {
      form.setError("root", { message: response.error.message });
      return;
    }
    if (response.success) {
      router.push("/");
    }
  };

  if (session.status === "authenticated") {
    router.push("/");
  }
  if (session.status === "loading") {
    return (
      <div className="text-4xl font-medium text-center mt-20">Loading</div>
    );
  }

  return (
    <section
      style={{
        minHeight: `calc(100dvh - 66px)`,
      }}
      className="flex items-center justify-center bg-gradient-to-b from-[#78c5f8] to-[#fffe]"
    >
      <Card className="my-5 w-[90%] sm:w-[80%] md:w-[30rem] rounded-3xl shadow-xl bg-gradient-to-b from-[#cadff3] to-[#ffffff]">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="mx-auto">Sign In</CardTitle>
          <CardDescription className="mx-auto text-center">
            Sign Up to Hotels and get the most of our services in our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formState.errors.root && (
            <p className="text-sm sm:text-base font-medium text-center bg-[#d42424d7] text-white p-1 rounded-sm">
              {formState.errors.root.message}
            </p>
          )}
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 md:space-y-3"
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FaUserEdit className="absolute top-2 left-2" size={22} />
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="font-bold pl-10 bg-[#d8cfcf]"
                      />
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
                    <MdEmail className="absolute top-2 left-1" size={23} />
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="font-bold pl-10 bg-[#d8cfcf]"
                      />
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
                      <Input
                        placeholder="Password"
                        {...field}
                        className="font-bold pl-10 bg-[#d8cfcf]"
                      />
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
                    <Phone className="absolute top-2 left-1" size={23} />
                    <FormControl>
                      <Input
                        placeholder="Phone"
                        {...field}
                        className="font-bold pl-10 bg-[#d8cfcf]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex">
                <Link
                  href={"/auth/sign-in"}
                  className="text-sm font-bold ml-auto underline text-blue-700"
                >
                  Have an account, Log in
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <p className="w-full text-center font-bold">OR</p>
              <div className="flex items-center justify-center gap-x-10 ">
                <button className="border rounded-md px-5 py-2 bg-white">
                  <FaGoogle size={25} />
                </button>
                <button className="border rounded-md px-5 py-2 bg-white">
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
