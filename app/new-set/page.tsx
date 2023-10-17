"use client";
import { SetBlueprint } from "@/lib/model/Set";
import SetEditionForm from "@/components/edit-set/SetEditionForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  const createSet = async (set: SetBlueprint) => {
    const response = await fetch("api/set", {
      method: "POST",
      body: JSON.stringify(set),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <SetEditionForm
      set={{ name: "newSet", flashcards: [] }}
      onSubmit={createSet}
    />
  );
}
