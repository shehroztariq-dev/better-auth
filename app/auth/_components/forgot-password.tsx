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
import { authClient } from "@/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const emailFormSchema = z.object({
  email: z.string("Enter valid email").min(1, "Email is required"),
});

type FormData = z.infer<typeof emailFormSchema>;

export default function ForgetPassword({
  openSignInTab,
}: {
  openSignInTab: () => void;
}) {
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
      redirectTo: "/auth/reset-password",
    });
    if (error) {
      toast.error(error.message as string);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.success("Password reset email sent");
      form.reset();
    }
  };
  return (
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="flex gap-2">
          <Button variant={"outline"} onClick={openSignInTab}>
            Back
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-34">
            {isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Send reset email"
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
