import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import * as schema from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";

import { Resend } from "resend";
import VerificationEmail from "@/components/emails/VerificationEmail";
import PasswordResetEmail from "@/components/emails/PasswordResetEmail";
import WelcomeEmail from "@/components/emails/WelcomeEmail";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: `${process.env.APP_NAME} <noreply@${process.env.DOMAIN}>`,
        to: user.email,
        subject: "Reset Your Password",
        react: PasswordResetEmail({
          username: user.name,
          reseturl: url,
        }),
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: `${process.env.APP_NAME} <verification@${process.env.DOMAIN}>`,
        to: user.email,
        subject: "Verify your email",
        react: VerificationEmail({ username: user.name, url: url }),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60, // 1 minute
    },
  },
  rateLimit: {
    storage: "database",
    window: 60, // seconds
    max: 10, // requests per window
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // For social sign-up - user is created and verified immediately
      if (ctx.path === "/sign-up/social") {
        const user = ctx.context.newSession?.user;
        const isNewUser = ctx.context.isNewUser; // Check if this is a new user creation

        if (isNewUser && user?.email && user?.name) {
          await resend.emails
            .send({
              from: `${process.env.APP_NAME} <welcome@${process.env.DOMAIN}>`,
              to: user.email,
              subject: `Welcome to ${process.env.APP_NAME}!`,
              react: WelcomeEmail({
                username: user.name,
                email: user.email,
              }),
            })
            .catch(console.error);
        }
      }

      if (ctx.path === "/verify-email") {
        const user = ctx.context.newSession?.user;

        if (user?.email && user?.name) {
          await resend.emails
            .send({
              from: `${process.env.APP_NAME} <welcome@${process.env.DOMAIN}>`,
              to: user.email,
              subject: `Welcome to ${process.env.APP_NAME}!`,
              react: WelcomeEmail({
                username: user.name,
                email: user.email,
              }),
            })
            .catch(console.error);
        }
      }
    }),
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  plugins: [nextCookies()],
});
