import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface PasswordResetEmailProps {
  username: string;
  reseturl: string;
}

const PasswordResetEmail = ({
  username,
  reseturl,
}: PasswordResetEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password - Action required</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-10 font-sans">
          <Container className="bg-white mx-auto p-10 max-w-150 rounded-lg">
            <Section>
              <Heading className="text-black text-[32px] font-bold text-center mb-8 m-0">
                Password Reset Request
              </Heading>

              <Text className="text-gray-800 text-[16px] leading-6 mb-6">
                Hello {username},
              </Text>

              <Text className="text-gray-800 text-[16px] leading-6 mb-6">
                We received a request to reset your password. If you didn&apos;t
                make this request, you can safely ignore this email.
              </Text>

              <Text className="text-gray-800 text-[16px] leading-6 mb-8">
                To reset your password, click the button below:
              </Text>

              <Section className="text-center mb-8">
                <Button
                  href={reseturl}
                  className="bg-black text-white px-8 py-4 rounded-lg text-[16px] font-semibold no-underline box-border inline-block">
                  Reset Password
                </Button>
              </Section>

              <Text className="text-gray-600 text-[14px] leading-5 mb-4">
                Or copy and paste this URL into your browser:
              </Text>

              <Text className="text-gray-600 text-[14px] leading-5 mb-8 break-all">
                <Link href={reseturl} className="text-black underline">
                  {reseturl}
                </Link>
              </Text>

              <Text className="text-gray-600 text-[14px] leading-5 mb-6">
                This link will expire in 24 hours for security reasons.
              </Text>

              <Text className="text-gray-800 text-[16px] leading-6 mb-8">
                If you continue to have problems, please contact our support
                team.
              </Text>

              <Text className="text-gray-800 text-[16px] leading-6">
                Best regards,
                <br />
                The Security Team
              </Text>
            </Section>

            <Section className="border-t border-gray-200 pt-8 mt-10">
              <Text className="text-gray-500 text-[12px] leading-4 text-center m-0 mb-lg">
                © 2026 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-gray-500 text-[12px] leading-4 text-center m-0 mb-lg">
                123 Business Street, Suite 100, Lahore, Pakistan
              </Text>
              <Text className="text-gray-500 text-[12px] leading-4 text-center m-0">
                <Link href="#" className="text-gray-500 underline">
                  Unsubscribe
                </Link>{" "}
                |
                <Link href="#" className="text-gray-500 underline ml-lg">
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
