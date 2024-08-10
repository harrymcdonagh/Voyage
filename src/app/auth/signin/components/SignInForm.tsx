"use client";

import Link from "next/link";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { IoRocketOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const schema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormFields = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      }); //returns 200 for success, 400 for failure
    } catch (error) {
      console.error("SignIn error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md border rounded-lg border-slate-700 p-10">
        <div>
          <Link href="#" className="flex justify-center" prefetch={false}>
            <IoRocketOutline className="h-12 w-12" />
          </Link>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign In
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              Email address
            </Label>
            <div className="mt-1">
              <Input
                placeholder="Enter your email address"
                {...register("email")}
                className="block w-full appearance-none rounded-md border border-muted px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
              Password
            </Label>
            <div className="mt-1">
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="block w-full appearance-none rounded-md border border-muted px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "..." : "Sign In"}{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
