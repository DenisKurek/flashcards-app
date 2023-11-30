"use client";
import LoadingPage from "@/app/(pages)/loading";
import LearnFlashcardForm from "@/components/learn-set/learnFlashcardForm";
import Set from "@/lib/model/Set";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import {
  getAllSetsRequest,
  updateSetRequest,
} from "@/lib/api-requests/Set-requests";
import Flashcard, { LearningState } from "@/lib/model/FlashCard";
import { getRandomSubset, updateFlashcard } from "@/lib/utils/flashcardUtils";
import {
  AnswerContextType,
  AnswersContext,
} from "@/store/Learning-set-Context";
import { updateAllSets } from "@/lib/utils/SetUtils";
import ErrorMessage from "@/components/ErrorMessage";

const MAX_INDEX = 5;
const shuffled = (array: Flashcard[]) => {
  const order = Object.values(LearningState);
  return array
    .slice()
    .sort((a, b) => order.indexOf(a.state) - order.indexOf(b.state))
    .slice(0, Math.min(array.length, MAX_INDEX))
    .sort(() => Math.random() - 0.5);
};

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [sets, setSets] = useState<Set[]>();
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
    if (!sets) {
      throw new Error("sets not initialized");
    }
    const flashcard: Flashcard = flashCards[flashCardId];
    const updatedFlashcard = updateFlashcard(flashcard, actual === expected);
    ctx.addAnswer({ actual, expected }, updatedFlashcard.state);
    flashCards[flashCardId] = updatedFlashcard;

    if (flashCards && flashCardId < flashCards.length - 1) {
      setFlashCardId((prev) => prev + 1);
    } else {
      const updatedSets = updateAllSets(sets, flashCards);
      updatedSets.forEach((set) => {
        updateSetRequest(set);
      });
      router.push("/learn-set/daily-set/summary");
    }
  };

  useEffect(() => {
    async function getSet() {
      setLoading(true);
      const response = await getAllSetsRequest();
      const { sets } = await response.json();
      setSets(sets);
      let flashcardsArr: Flashcard[] = [];
      sets.forEach(
        (set: Set) => (flashcardsArr = flashcardsArr.concat(set.flashcards)),
      );
      setFlashCards(getRandomSubset(flashcardsArr));
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
          message={"You Have no more flashCards to repeat today. "}
        />
      )}
      {flashCards[flashCardId] && (
        <LearnFlashcardForm
          onSubmit={handleSubmit}
          flashCard={flashCards[flashCardId]}
        />
      )}
    </div>
  );
}
