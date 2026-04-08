"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import { AlertCircle, Trash2, AlertTriangle } from "lucide-react";

const deletionSchema = z.object({
  confirmText: z.string().refine((val) => val === "delete my account", {
    message: 'Please type "delete my account" to confirm',
  }),
  password: z.string().min(1, "Password is required"),
});

type DeletionForm = z.infer<typeof deletionSchema>;

export default function AccountDeletion() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(deletionSchema),
    defaultValues: {
      confirmText: "",
      password: "",
    },
  });

  const onSubmit = async (data: DeletionForm) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const { error } = await authClient.deleteUser({
        password: data.password,
      });

      if (error) {
        setServerError(error.message || "Failed to delete account");
        return;
      }

      // Success - redirect to logout or home page
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      setServerError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Danger Zone</AlertTitle>
        <AlertDescription>
          Once you delete your account, there is no going back. This action is
          permanent and will remove all your data from our systems.
        </AlertDescription>
      </Alert>

      {/* Account Deletion Button */}
      <div className="rounded-lg border border-destructive/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-destructive">Delete Account</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Permanently remove your account and all associated data
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                {serverError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{serverError}</AlertDescription>
                  </Alert>
                )}

                <FieldGroup>
                  <Controller
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-1">
                        <FieldLabel htmlFor={field.name}>
                          Enter your password to confirm
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="password"
                          disabled={isLoading}
                          aria-invalid={fieldState.invalid}
                          autoComplete="current-password"
                          placeholder="Your password"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="confirmText"
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-1">
                        <FieldLabel htmlFor={field.name}>
                          Type{" "}
                          <span className="font-mono font-bold">
                            delete my account
                          </span>{" "}
                          to confirm
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="text"
                          disabled={isLoading}
                          aria-invalid={fieldState.invalid}
                          placeholder="delete my account"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      form.reset();
                      setServerError(null);
                    }}
                    disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={
                      isLoading ||
                      !form.formState.isValid ||
                      !form.formState.isDirty
                    }>
                    {isLoading ? "Deleting..." : "Permanently Delete Account"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
