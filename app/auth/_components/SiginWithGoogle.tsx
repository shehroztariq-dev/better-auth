"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function SignInWithGoogle() {
  return (
    <Button
      onClick={signInWithGoogle}
      variant={"outline"}
      className="w-full cursor-pointer">
      <FcGoogle className="w-5 h-5 " />
      Continue with Google
    </Button>
  );
}
