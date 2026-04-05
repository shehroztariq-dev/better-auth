import type { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" className={cn("font-sans dark", geist.variable)}>
      <body className={`${montserratSans} antialiased`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
