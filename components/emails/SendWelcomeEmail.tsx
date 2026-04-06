import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

interface SendWelcomeEmailProps {
  name: string;
  email: string;
}

const SendWelcomeEmail = ({ name, email }: SendWelcomeEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Welcome to our platform! Let&apos;s get you started.</Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg shadow-lg max-w-150 mx-auto border border-solid border-gray-200">
            {/* Header */}
            <Section className="bg-black text-white text-center py-8 rounded-t-lg">
              <Heading className="text-[28px] font-bold m-0">
                Welcome to Our Platform!
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="px-10 py-8">
              <Heading className="text-[24px] font-bold text-black mb-4">
                Hello {name}! 👋
              </Heading>

              <Text className="text-[16px] text-gray-800 mb-6 leading-6">
                We&apos;re thrilled to have you join our community! Your account
                has been successfully created with the email address{" "}
                <strong>{email}</strong>.
              </Text>

              <Text className="text-[16px] text-gray-800 mb-6 leading-6">
                Here&apos;s what you can do next to get the most out of your
                experience:
              </Text>

              <Text className="text-[14px] text-gray-600 leading-5">
                If you have any questions or need assistance, don&apos;t
                hesitate to reach out to our support team. We&aposre here to
                help you succeed!
              </Text>
            </Section>

            <Hr className="border-gray-300 my-5" />

            {/* Footer */}
            <Section className="px-10 pb-8">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-2">
                © 2026 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-2">
                123 Business Street, Suite 100, City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                <a href="#" className="text-gray-500 underline">
                  Unsubscribe
                </a>{" "}
                |
                <a href="#" className="text-gray-500 underline ml-2">
                  Privacy Policy
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SendWelcomeEmail;
