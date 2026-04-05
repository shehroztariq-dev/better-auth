"use client";
import { Button } from "@/components/ui/button";
import { signInWithDiscord } from "@/lib/auth-client";
import { FaDiscord } from "react-icons/fa";

export default function SignInWithDiscord() {
  return (
    <Button
      onClick={signInWithDiscord}
      variant={"outline"}
      className="w-full cursor-pointer">
      <FaDiscord className="w-5 h-5 shrink-0" />
      Continue with Discord
    </Button>
  );
}
