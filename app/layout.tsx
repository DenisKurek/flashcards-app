"use client";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container mx-auto bg-slate-500">
        <SessionProvider>
          <Navbar />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
