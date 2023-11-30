"use client";
import LoadingPage from "@/app/(pages)/loading";
import LearnFlashcardForm from "@/components/learn-set/learnFlashcardForm";
import Set from "@/lib/model/Set";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import {
  getSetRequest,
  updateSetRequest,
} from "@/lib/api-requests/Set-requests";
import Flashcard from "@/lib/model/FlashCard";
import { getRandomSubset, updateFlashcard } from "@/lib/utils/flashcardUtils";
import {
  AnswerContextType,
  AnswersContext,
} from "@/store/Learning-set-Context";
import { updateSet } from "@/lib/utils/SetUtils";
import ErrorMessage from "@/components/ErrorMessage";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [set, setSet] = useState<Set>();
  const [flashCards, setFlashCards] = useState<Flashcard[]>([]);
  const [flashCardId, setFlashCardId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const ctx = useContext(AnswersContext) as AnswerContextType;

  const handleSubmit = (
    e: SyntheticEvent,
    actual: string,
    expected: string,
  ) => {
    e.preventDefault();
    if (!set) {
      throw new Error("set not initialized");
    }
    const flashcard: Flashcard = flashCards[flashCardId];
    const updatedFlashcard = updateFlashcard(flashcard, actual === expected);

    ctx.addAnswer({ actual, expected }, updatedFlashcard.state);
    flashCards[flashCardId] = updatedFlashcard;

    if (flashCards && flashCardId < flashCards.length - 1) {
      setFlashCardId((prev) => prev + 1);
    } else {
      updateSetRequest(updateSet(set, flashCards));
      router.push(`${params.id}/summary`);
    }
  };

  useEffect(() => {
    async function getSet() {
      setLoading(true);
      const data = await getSetRequest(params.id);
      setSet(data);
      setFlashCards(getRandomSubset(data.flashcards));
      ctx.clear();
      setLoading(false);
    }
    getSet();
  }, [params.id]);

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="container ">
      {flashCards.length === 0 && (
        <ErrorMessage
          message={
            "You Have no more flashCards from this set to repeat today. "
          }
        />
      )}
      {set && flashCards[flashCardId] && (
        <LearnFlashcardForm
          setId={set._id.toString()}
          onSubmit={handleSubmit}
          flashCard={flashCards[flashCardId]}
        />
      )}
    </div>
  );
}
