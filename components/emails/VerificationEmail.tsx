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

interface VerificationEmailProps {
  username: string;
  url: string;
}

const VerificationEmail = ({ username, url }: VerificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your email address to complete your registration</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg p-8 max-w-150 mx-auto">
            <Section>
              <Heading className="text-[24px] font-bold text-black mb-6 text-center m-0">
                Verify Your Email Address
              </Heading>

              <Text className="text-[16px] text-gray-800 mb-6 leading-6">
                Welcome, {username}. Thank you for signing up! To complete your
                registration and secure your account, please verify your email
                address by clicking the button below.
              </Text>

              <Section className="text-center mb-8">
                <Button
                  href={url}
                  className="bg-black text-white px-8 py-4 rounded-lg text-[16px] font-semibold no-underline box-border inline-block">
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-4 leading-5">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>

              <Text className="text-[14px] text-gray-600 mb-8 break-all">
                <Link href={url} className="text-black underline">
                  {url}
                </Link>
              </Text>

              <Text className="text-[14px] text-gray-600 mb-6 leading-5">
                This verification link will expire in 24 hours for security
                reasons. If you didn&apos;t create an account, you can safely
                ignore this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
