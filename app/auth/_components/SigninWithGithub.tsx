"use client";
import { FaGithub } from "react-icons/fa";
import { signInWithGithub } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignInWithGithub() {
  return (
    <Button
      onClick={signInWithGithub}
      className="cursor-pointer"
      variant={"outline"}>
      <FaGithub className="w-5 h-5 " />
      Continue with Github
    </Button>
  );
}
