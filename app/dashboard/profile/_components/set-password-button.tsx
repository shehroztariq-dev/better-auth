"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useState } from "react";

export default function SetPasswordButton({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const RequestReset = async () => {
    setIsLoading(true);
    await authClient.requestPasswordReset(
      {
        email,
        redirectTo: "/auth/reset-password",
      },
      {
        onSuccess: () => {
          toast.success("Password reset email sent. check your inbox");
          setIsLoading(false);
        },
        onError: (error) => {
          toast.error(error.error.message || "An error occured");
          setIsLoading(false);
        },
      },
    );
  };
  return (
    <Button onClick={RequestReset} disabled={isLoading}>
      {isLoading ? "Sending..." : "Send verification Email"}
    </Button>
  );
}
