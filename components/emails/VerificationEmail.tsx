import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  verificationUrl: string;
}

export const VerificationEmail = (props: VerificationEmailProps) => {
  const { username, verificationUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>
          Verify your email address to complete your account setup
        </Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg shadow-sm max-w-150 mx-auto p-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-4">
                Verify Your Email Address
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We need to verify your email address to complete your account
                setup
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 mb-4 m-0">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-4 m-0">
                Thank you for signing up! To get started, please verify your
                email address by clicking the button below:
              </Text>
              <Text className="text-[14px] text-gray-600 mb-6 m-0">
                <strong>Username:</strong> {username}
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-6">
                <Button
                  href={verificationUrl}
                  className="bg-blue-600 text-white px-8 mb-4 rounded-lg text-[16px] font-semibold no-underline box-border inline-block">
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-4 m-0">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 mb-6 m-0 break-all">
                {verificationUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 mb-4 m-0">
                This verification link will expire in 24 hours for security
                reasons.
              </Text>
              <Text className="text-[14px] text-gray-600 m-0">
                If you didn&apos;t create an account, you can safely ignore this
                email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6 mt-10">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-2">
                Best regards,
                <br />
                The Team
              </Text>
              <Text className="text-[12px] text-gray-400 text-center m-0 mb-2">
                123 Business Street, Suite 100
                <br />
                City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-400 text-center m-0">
                © 2026 Company Name. All rights reserved. |
                <a href="#" className="text-gray-400 no-underline">
                  {" "}
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
