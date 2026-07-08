//src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/common/LayoutWrapper";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "MPR Furniture",
  description: "Premium Furniture Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}