"use client";
import LoadingPage from "@/app/loading";
import LearnFlashcardForm from "@/components/learn-set/learnFlashcardForm";
import Set from "@/lib/model/Set";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [set, setSet] = useState<Set>();
  const [flashCardId, setFlashCardId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (set && flashCardId < set?.flashcards.length - 1) {
      setFlashCardId((prev) => prev + 1);
    } else {
      router.push(`/learn-set/${params.id}/summary`);
    }
  };

  useEffect(() => {
    async function getSet() {
      setLoading(true);
      const response = await fetch(`/api/set/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setLoading(false);
        throw console.error(response);
      }
      const data = await response.json();

      setSet(data.set);
      setLoading(false);
    }
    getSet();
  }, [params.id]);

  return !set && loading ? (
    <LoadingPage />
  ) : (
    <div className="container ">
      {set?.flashcards[flashCardId] && (
        <LearnFlashcardForm
          setId={set._id.toString()}
          onSubmit={handleSubmit}
          flashCard={set.flashcards[flashCardId]}
        />
      )}
    </div>
  );
}
