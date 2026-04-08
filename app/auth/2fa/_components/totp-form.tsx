"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const backupCodeSchema = z.object({
  code: z.string().min(1, "Backup code is required"),
});

type BackupCodeForm = z.infer<typeof backupCodeSchema>;

export function TotpForm() {
  const router = useRouter();
  const form = useForm<BackupCodeForm>({
    resolver: zodResolver(backupCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleBackupCodeVerification(data: BackupCodeForm) {
    await authClient.twoFactor.verifyBackupCode(data, {
      onError: (error) => {
        toast.error(error.error.message || "Failed to verify code");
      },
      onSuccess: () => {
        toast.success("Backup code verified successfully");
        router.push("/");
      },
    });
  }

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(handleBackupCodeVerification)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor={field.name}>Backup Code</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your backup code"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
}
