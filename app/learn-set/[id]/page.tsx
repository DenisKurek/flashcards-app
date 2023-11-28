"use client";
import LoadingPage from "@/app/loading";
import LearnFlashcardForm from "@/components/learn-set/learnFlashcardForm";
import Set from "@/lib/model/Set";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import {
  getSetRequest,
  updateSetRequest,
} from "@/lib/api-requests/Set-requests";
import Flashcard from "@/lib/model/FlashCard";
import { updateFlashcard } from "@/lib/utils/flashcardUtils";
import {
  AnswerContextType,
  AnswersContext,
} from "@/store/Learning-set-Context";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [set, setSet] = useState<Set>();
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
    const flashcard: Flashcard = set.flashcards[flashCardId];
    const updatedFlashcard = updateFlashcard(flashcard, actual === expected);
    ctx.addAnswer({ actual, expected }, updatedFlashcard.state);
    set.flashcards[flashCardId] = updatedFlashcard;

    if (set && flashCardId < set?.flashcards.length - 1) {
      setFlashCardId((prev) => prev + 1);
    } else {
      updateSetRequest(set);
      router.push(`${params.id}/summary`);
    }
  };

  useEffect(() => {
    async function getSet() {
      setLoading(true);
      const data = await getSetRequest(params.id);
      setSet(data);
      setLoading(false);
    }
    getSet();
    ctx.clear();
  }, [params.id]);

  return loading ? (
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
