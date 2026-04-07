"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function EmailVerification({ email }: { email: string }) {
  const [timeToNextResend, setTimeToNextResend] = useState(30);
  const interval = useRef<NodeJS.Timeout>(undefined);

  function startEmailVerificationCountDown(time = 30) {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        if (t <= 1) {
          clearInterval(interval.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    startEmailVerificationCountDown();
    return () => clearInterval(interval.current);
  }, []);

  const resendEmail = async () => {
    setTimeToNextResend(30);
    await authClient.sendVerificationEmail(
      { email, callbackURL: "/" },
      {
        onSuccess: () => {
          startEmailVerificationCountDown(30);
          toast.success("Verification email sent");
        },
        onError: (ctx) => {
          setTimeToNextResend(0);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mt-2">
        We sent you a verification link. Please check your email and click the
        link to verify your email.
      </p>
      <Button
        disabled={timeToNextResend > 0}
        variant={"outline"}
        className="w-full"
        onClick={resendEmail}>
        {timeToNextResend > 0
          ? `Resend Email (${timeToNextResend})`
          : "Resend Email"}
      </Button>
    </div>
  );
}
