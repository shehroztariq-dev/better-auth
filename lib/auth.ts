import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // drizzle instance
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/db/schema";

import { Resend } from "resend";
import { ForgotPasswordEmail } from "@/components/ForgotPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY! as string);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      resend.emails.send({
        from: "reset-password@techoutlet.pk",
        to: user.email,
        subject: "Reset Your Password",
        react: ForgotPasswordEmail({
          userEmail: user.email,
          username: user.name,
          resetLink: url,
        }),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  plugins: [nextCookies()],
});
