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
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import EmailVerification from "./_components/email-verification";
import SocialOauthButtons from "./_components/social-oauth-buttons";
import ForgotPassword from "./_components/forgot-password";

type Tab = "signin" | "signup" | "email-verification" | "forgot-password";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [selectedTab, setSelectedtab] = useState<Tab>("signin");

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data != null) router.push("/");
    });
  }, [router]);

  function openEmailVerificationTab(email: string) {
    setEmail(email);
    setSelectedtab("email-verification");
  }
  function openForgotPasswordTab() {
    setSelectedtab("forgot-password");
  }
  function openSignInTab() {
    setSelectedtab("signin");
  }

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(t) => setSelectedtab(t as Tab)}
      className="w-100">
      {(selectedTab === "signin" || selectedTab === "signup") && (
        <TabsList>
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
      )}
      <TabsContent value="signin">
        <Card>
          <CardContent>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Sign in if you have account or create new account
            </CardDescription>
            <SignInForm
              openEmailVerificationTab={openEmailVerificationTab}
              openForgotPasswordTab={openForgotPasswordTab}
            />
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
            <SignUpForm openEmailVerificationTab={openEmailVerificationTab} />
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
      <TabsContent value="email-verification">
        <Card>
          <CardContent>
            <CardTitle>Verify email</CardTitle>
            <EmailVerification email={email} />
          </CardContent>
        </Card>
      </TabsContent>{" "}
      <TabsContent value="forgot-password">
        <Card>
          <CardContent>
            <CardTitle>Forget Password</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter email to reset your password
            </CardDescription>
            <ForgotPassword openSignInTab={openSignInTab} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
