import { FaDiscord, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IconType } from "react-icons/lib";

export const SUPPORTED_OAUTH_PROVIDERS = ["google", "github", "discord"];
export type SupportedOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDERS_DETAILS: Record<
  SupportedOAuthProvider,
  { name: string; Icon: IconType }
> = {
  google: { name: "Google", Icon: FcGoogle },
  github: { name: "Github", Icon: FaGithub },
  discord: { name: "Discord", Icon: FaDiscord },
};
