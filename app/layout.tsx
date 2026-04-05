import type { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${montserratSans} antialiased`}>
        <Toaster position="top-right" reverseOrder={false} gutter={24} />
        {children}
      </body>
    </html>
  );
}
