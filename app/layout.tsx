"use client";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-subtle">
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
