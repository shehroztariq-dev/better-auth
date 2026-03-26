import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
  userEmail: string;
  resetLink: string;
  username: string;
}

export const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const { userEmail, resetLink, username } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg shadow-sm max-w-145 mx-auto px-10 py-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-2">
                Reset Your Password
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 leading-6 m-0 mb-4">
                Hello {username},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-6 m-0 mb-4">
                Someone requested a password reset for your account associated
                with <strong>{userEmail}</strong>. If this was you, click the
                butto n below to reset your password.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-6 m-0 mb-6">
                If you didn&apos;t request this password reset, you can safely
                ignore this email. Your password will remain unchanged.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-6">
                <Button
                  href={resetLink}
                  className="bg-blue-600 text-white px-8 py-3 rounded-md text-[16px] font-semibold no-underline box-border inline-block">
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-5 m-0 mb-4">
                Or copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-5 m-0 mb-6 break-all">
                <Link href={resetLink} className="text-blue-600 underline">
                  {resetLink}
                </Link>
              </Text>

              <Text className="text-[14px] text-gray-600 leading-5 m-0">
                <strong>Important:</strong> This link will expire in 24 hours
                for security reasons. If you need to reset your password after
                that, please request a new reset link.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-6" />

            {/* Security Notice */}
            <Section className="mb-6">
              <Text className="text-[14px] text-gray-600 leading-5 m-0 mb-2">
                <strong>Security Tips:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-5 m-0 mb-1">
                • Choose a strong, unique password
              </Text>
              <Text className="text-[14px] text-gray-600 leading-5 m-0 mb-1">
                • Don&apos;t share your password with anyone
              </Text>
              <Text className="text-[14px] text-gray-600 leading-5 m-0">
                • Consider using a password manager
              </Text>
            </Section>

            <Hr className="border-gray-200 my-6" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 leading-4 m-0 mb-2">
                If you have any questions, please contact our support team.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-4 m-0 mb-4">
                This email was sent to {userEmail}
              </Text>
              <Text className="text-[12px] text-gray-500 leading-4 m-0">
                © 2026 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-4 m-0">
                123 Business Street, Lahore, Pakistan
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
