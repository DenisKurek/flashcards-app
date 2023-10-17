"use client";
import SetsList from "@/components/SetsList";
import "bootstrap/dist/css/bootstrap.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  return (
    <div className="container">
      <SetsList />
    </div>
  );
}
