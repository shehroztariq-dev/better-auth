"use client";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export function LoadingSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <Loader2Icon className="size-10 animate-spin max-w-full flex items-center justify-center" />
      }>
      {children}
    </Suspense>
  );
}
