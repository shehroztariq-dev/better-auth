// components/emails/EmailChangeNotification.tsx
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

interface EmailChangeNotificationProps {
  username: string;
  supportUrl?: string;
}

const EmailChangeNotification = ({
  username,
  supportUrl = "#",
}: EmailChangeNotificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Security alert: Your email address has been changed</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg p-8 max-w-150 mx-auto">
            <Section>
              <Heading className="text-[24px] font-bold text-black mb-6 text-center m-0">
                Email Address Changed
              </Heading>

              <Text className="text-[16px] text-gray-800 mb-4 leading-6">
                Hello {username},
              </Text>

              <Text className="text-[16px] text-gray-800 mb-6 leading-6">
                Your email address has been successfully changed. If you made
                this change, no further action is required.
              </Text>

              <Text className="text-[16px] text-gray-800 mb-6 leading-6">
                If you did NOT make this change, please secure your account
                immediately:
              </Text>

              <Section className="mb-8">
                <Text className="text-[16px] text-gray-800 mb-3 leading-6">
                  • Reset your password
                </Text>
                <Text className="text-[16px] text-gray-800 mb-3 leading-6">
                  • Review your account activity
                </Text>
                <Text className="text-[16px] text-gray-800 mb-6 leading-6">
                  • Contact our support team
                </Text>
              </Section>

              <Section className="text-center mb-8">
                <Button
                  href={supportUrl}
                  className="bg-black text-white px-8 py-4 rounded-lg text-[16px] font-semibold no-underline box-border inline-block">
                  Contact Support
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-0 leading-5">
                This is a security notification from your account. If you have
                any questions, please contact our support team.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailChangeNotification;
