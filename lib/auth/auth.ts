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
import EmailChangeConfirmation from "@/components/emails/EmailChangeConfirmation";
import EmailChangeNotification from "@/components/emails/EmailChangeNotification";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async (data, request) => {
        const { user, newEmail, url } = data;

        try {
          await resend.emails.send({
            from: `${process.env.APP_NAME} <verification@${process.env.DOMAIN}>`,
            to: newEmail,
            subject: "Confirm Your Email Change",
            react: EmailChangeConfirmation({
              username: user.name,
              currentEmail: user.email,
              newEmail: newEmail,
              confirmationUrl: url,
            }),
          });

          console.log(`Email change confirmation sent to ${newEmail}`);
        } catch (error) {
          console.error("Failed to send email change confirmation:", error);
          throw new Error("Failed to send confirmation email");
        }
      },
    },
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      last_name: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
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
  // hooks: {
  //   after: createAuthMiddleware(async (ctx) => {
  //     if (ctx.path === "/sign-up/social") {
  //       const user = ctx.context.newSession?.user;
  //       const isNewUser = ctx.context.isNewUser;

  //       if (isNewUser && user?.email && user?.name) {
  //         await resend.emails
  //           .send({
  //             from: `${process.env.APP_NAME} <welcome@${process.env.DOMAIN}>`,
  //             to: user.email,
  //             subject: `Welcome to ${process.env.APP_NAME}!`,
  //             react: WelcomeEmail({
  //               username: user.name,
  //               email: user.email,
  //             }),
  //           })
  //           .catch(console.error);
  //       }
  //     }

  //     if (ctx.path === "/verify-email") {
  //       const user = ctx.context.newSession?.user;
  //       const isEmailChange = ctx.context.isEmailChange;

  //       if (user?.email && user?.name && !isEmailChange) {
  //         await resend.emails
  //           .send({
  //             from: `${process.env.APP_NAME} <welcome@${process.env.DOMAIN}>`,
  //             to: user.email,
  //             subject: `Welcome to ${process.env.APP_NAME}!`,
  //             react: WelcomeEmail({
  //               username: user.name,
  //               email: user.email,
  //             }),
  //           })
  //           .catch(console.error);
  //       }
  //     }

  //     if (ctx.path === "/change-email") {
  //       const user = ctx.context.user;
  //       if (user?.email) {
  //         await resend.emails
  //           .send({
  //             from: `${process.env.APP_NAME} <security@${process.env.DOMAIN}>`,
  //             to: user.email,
  //             subject: "Your email has been changed",
  //             react: EmailChangeNotification({
  //               username: user.name,
  //             }),
  //           })
  //           .catch(console.error);
  //       }
  //     }
  //   }),
  // },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  plugins: [nextCookies()],
});
