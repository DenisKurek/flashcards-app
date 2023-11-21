"use client";
import LoadingPage from "@/app/loading";
import LearnFlashcardForm from "@/components/learn-set/learnFlashcardForm";
import Set from "@/lib/model/Set";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  getSetRequest,
  updateSetRequest,
} from "@/lib/api-requests/Set-requests";
import Flashcard from "@/lib/model/FlashCard";
import { updateFlashcard } from "@/lib/utils/flashcardUtils";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [set, setSet] = useState<Set>();
  const [flashCardId, setFlashCardId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (
    e: SyntheticEvent,
    actual: string,
    expected: string,
  ) => {
    e.preventDefault();
    if (!set) {
      throw new Error("set not initialized");
    }
    const flashcard: Flashcard = set.flashcards[flashCardId];
    const updatedFlashcard = updateFlashcard(flashcard, actual === expected);

    set.flashcards[flashCardId] = updatedFlashcard;
    if (set && flashCardId < set?.flashcards.length - 1) {
      setFlashCardId((prev) => prev + 1);
    } else {
      updateSetRequest(set);
      router.push(`/learn-set/${params.id}/summary`);
    }
  };

  useEffect(() => {
    async function getSet() {
      setLoading(true);
      try {
        const data = await getSetRequest(params.id);
        setSet(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
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
