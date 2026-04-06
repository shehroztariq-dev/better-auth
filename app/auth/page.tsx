"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./_components/SignInForm";
import SignUpForm from "./_components/SignUpForm";
import { Separator } from "@/components/ui/separator";
import SocialOauthButtons from "./_components/Social-oauth-buttons";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data != null) router.push("/");
    });
  }, [router]);

  return (
    <Tabs defaultValue="signin" className="w-100">
      <TabsList>
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="signup">Sign up</TabsTrigger>
      </TabsList>

      <TabsContent value="signin">
        <Card>
          <CardContent>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Sign in if you have account or create new account
            </CardDescription>
            <SignInForm />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <SocialOauthButtons />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardContent>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Create account account to continue.
            </CardDescription>
            <SignUpForm />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <SocialOauthButtons />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
