"use client";

import { useState } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LuLoaderCircle } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignInForm({
  openEmailVerificationTab,
}: {
  openEmailVerificationTab: (email: string) => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Define Zod schema
  const signInSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters"),
  });

  type SignInForm = z.infer<typeof signInSchema>;
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true);
    await authClient.signIn.email(
      {
        ...data,
      },
      {
        onSuccess: () => {
          toast.success("Sign in successfully");
          router.push("/");
          setIsLoading(false);
        },
        onError: (error) => {
          if (error.error.code === "EMAIL_NOT_VERIFIED") {
            openEmailVerificationTab(data.email);
            setIsLoading(false);
          }
          toast.error(error.error.message || "Failed to sign in");
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="my-2 gap-2">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <div className="flex justify-between">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <FieldDescription>
                  <Button variant={"link"} asChild>
                    <Link href={"/auth/forget-password"}>Forget Password?</Link>
                  </Button>
                </FieldDescription>
              </div>
              <Input
                {...field}
                type="password"
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer">
          {isLoading ? (
            <>
              <LuLoaderCircle className=" animate-spin" />
              Please wait...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
