"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  SUPPORTED_OAUTH_PROVIDERS,
  SUPPORTED_OAUTH_PROVIDERS_DETAILS,
} from "@/lib/auth-providers";

export default function SocialOauthButtons() {
  return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
    const Icon = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].Icon;
    return (
      <Button
        key={provider}
        variant={"outline"}
        onClick={() => {
          authClient.signIn.social({ provider, callbackURL: "/" });
        }}>
        <Icon />
        {SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].name}
      </Button>
    );
  });
}
