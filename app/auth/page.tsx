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
import SignInWithGoogle from "./_components/SiginWithGoogle";
import SignInWithDiscord from "./_components/SiginWithDiscord";
import SignInWithGithub from "./_components/SigninWithGithub";

export default function page() {
  return (
    <Tabs defaultValue="signin" className="w-100">
      <TabsList>
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="signup">Sign up</TabsTrigger>
      </TabsList>
      <Card>
        <CardContent>
          <TabsContent value="signin">
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Sign in if you have account or create new account
            </CardDescription>
            <SignInForm />
          </TabsContent>
          <TabsContent value="signup">
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Create account account to continue.
            </CardDescription>
            <SignUpForm />
          </TabsContent>
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
          <div className="flex flex-col gap-1">
            <SignInWithGoogle />
            <SignInWithDiscord />
            <SignInWithGithub />
          </div>
        </CardContent>
      </Card>
    </Tabs>
  );
}
