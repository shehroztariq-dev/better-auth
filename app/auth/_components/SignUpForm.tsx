"use client";

import { useState } from "react";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LuLoaderCircle } from "react-icons/lu";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

// Main
export default function SignUpForm({
  openEmailVerificationTab,
}: {
  openEmailVerificationTab: (email: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    // Auth Client
    const res = await authClient.signUp.email(
      {
        ...data,
        callbackURL: "/",
      },
      {
        onSuccess: (ctx) => {
          toast.success(
            "Account created! Please check your email for verification.",
          );
          setIsLoading(false);
          form.reset();
          if (!ctx.data.user.emailVerified) {
            openEmailVerificationTab(data.email);
          }
        },
        onError: (error) => {
          toast.error(error.error.message || "Failed to signup");
          setIsLoading(false);
          form.reset();
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-2">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
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
              </div>
              <Input
                {...field}
                id={field.name}
                type={field.name}
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
          {isLoading ? <LuLoaderCircle className=" animate-spin" /> : "Sign Up"}
        </Button>
      </FieldGroup>
    </form>
  );
}
