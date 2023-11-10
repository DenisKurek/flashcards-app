"use client";
import { SetBlueprint } from "@/lib/model/Set";
import SetEditionForm from "@/components/edit-set/SetEditionForm";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

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
      set={{
        name: "newSet",
        tags: [],
        flashcards: [],
        language: { concept: "English", definition: "English" },
      }}
      onSubmit={createSet}
    />
  );
}
