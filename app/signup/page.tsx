"use client";

import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUp } from "@/server/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { success, message } = await signUp(
      data.email,
      data.password,
      data.name,
    );
    if (success) {
      router.push("/dashboard");
      toast.success(message as string);
    } else {
      setIsLoading(false);
      toast.error(message as string);
    }
  };
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 pt-2">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Create your account
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            Enter your details below to sign up
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 focus:border-transparent transition-all"
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50 block">
                Name
              </label>
              <input
                id="name"
                type="name"
                {...register("name")}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 focus:border-transparent transition-all"
                placeholder="Joe Doe"
              />
              {errors.name && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-50 block">
                  Password
                </label>
              </div>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
              <div className="flex items-end w-full justify-end">
                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-zinc-900 dark:text-zinc-50 hover:underline underline-offset-4">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-medium rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <FiLoader className="animate-spin h-4 w-4" />
                  Please wait...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500 dark:text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="w-full">
            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex items-center w-full justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-50 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-300 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all">
              <FcGoogle className="w-5 h-5" />
              Google
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-6">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline underline-offset-4">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
