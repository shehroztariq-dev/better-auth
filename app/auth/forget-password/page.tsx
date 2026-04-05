"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const emailFormSchema = z.object({
  email: z.string("Enter valid email").min(1, "Email is required"),
});

type FormData = z.infer<typeof emailFormSchema>;

export default function ForgetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { error } = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: "/reset-password",
    });
    if (error) {
      toast.error(error.message as string);
    } else {
      setIsLoading(false);
      toast.success("Password reset email sent");
      form.reset();
    }
  };
  return (
    <Card>
      <CardContent>
        <CardTitle>Forget Password?</CardTitle>
        <CardDescription>
          Enter your email to get password reset email
        </CardDescription>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-2">
          <FieldGroup>
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit">Send verification email</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
