import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const montserratSans = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Auth",
  description: "Better Auth Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratSans} antialiased`}>
        <Toaster position="top-right" reverseOrder={false} gutter={24} />
        {children}
      </body>
    </html>
  );
}
