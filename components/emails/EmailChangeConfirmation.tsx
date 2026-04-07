// components/emails/EmailChangeConfirmation.tsx
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

interface EmailChangeConfirmationProps {
  username: string;
  currentEmail: string;
  newEmail: string;
  confirmationUrl: string;
}

const EmailChangeConfirmation = ({
  username,
  currentEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeConfirmationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Confirm your email address change request</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg p-8 max-w-150 mx-auto">
            <Section>
              <Heading className="text-[24px] font-bold text-black mb-6 text-center m-0">
                Confirm Email Change
              </Heading>

              <Text className="text-[16px] text-gray-800 mb-4 leading-6">
                Hello {username},
              </Text>

              <Text className="text-[16px] text-gray-800 mb-6 leading-6">
                You requested to change your email address from{" "}
                <strong className="font-semibold">{currentEmail}</strong> to{" "}
                <strong className="font-semibold">{newEmail}</strong>.
              </Text>

              <Text className="text-[16px] text-gray-800 mb-6 leading-6">
                To complete this change, please click the button below:
              </Text>

              <Section className="text-center mb-8">
                <Button
                  href={confirmationUrl}
                  className="bg-black text-white px-8 py-4 rounded-lg text-[16px] font-semibold no-underline box-border inline-block">
                  Confirm Email Change
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-4 leading-5">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>

              <Text className="text-[14px] text-gray-600 mb-8 break-all">
                <Link href={confirmationUrl} className="text-black underline">
                  {confirmationUrl}
                </Link>
              </Text>

              <Text className="text-[14px] text-gray-600 mb-4 leading-5">
                This confirmation link will expire in 1 hour for security
                reasons.
              </Text>

              <Text className="text-[14px] text-gray-600 mb-0 leading-5">
                If you didn&apos;t request this change, you can safely ignore
                this email. Your email address will remain unchanged.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailChangeConfirmation;
