"use client";
import SetEditionForm from "@/components/edit-set/SetEditionForm";
import Flashcard, { LearningState } from "@/lib/model/FlashCard";
import { getSetRequest } from "@/lib/api-requests/Set-requests";
import { useEffect, useState } from "react";
import Set, { SetBlueprint } from "@/lib/model/Set";
import LoadingPage from "@/app/(pages)/loading";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const [set, setSet] = useState<Set>();
  const router = useRouter();

  useEffect(() => {
    async function getSet() {
      try {
        const data = await getSetRequest(params.id).then((set: any) => {
          return {
            ...set,
            _id: set._id.toString(),
            flashcards: set.flashcards.map(
              (flashcard: Flashcard, id: number) => {
                return {
                  ...flashcard,
                  id: id,
                  state: LearningState.NOT_STARTED,
                };
              },
            ),
          };
        });
        setSet(data);
      } catch (error) {
        console.log(error);
      }
    }
    getSet();
  }, [params.id]);

  const importSet = async (set: SetBlueprint) => {
    const response = await fetch("/api/set", {
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

  return set ? (
    <SetEditionForm
      set={set}
      onSubmit={importSet}
      submitButtonLabel={"Import"}
    />
  ) : (
    <LoadingPage />
  );
}
