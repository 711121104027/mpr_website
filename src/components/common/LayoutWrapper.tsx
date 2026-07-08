//src/components/common/LayoutWrapper.tsx

"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({
  children,
}: LayoutWrapperProps) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/MPRfuradm");

  if (isAdmin) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Header />

      <main className="flex-1">
        {children}
      </main>
      
      <FloatingContactButtons />

      <Footer />
    </>
  );
}