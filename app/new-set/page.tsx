"use client";
import FlashcardForm from "@/components/new-set/FlashcardForm";
import NewFlashCard from "@/components/new-set/NewFlashCard";
import Set from "@/lib/model/Set";
import Flashcard from "@/lib/ui-model/flashcard";
import { useState } from "react";

async function createSet(set: Set) {
  const response = await fetch("api/v1/set", {
    method: "POST",
    body: JSON.stringify(set),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function HomePage() {
  const [flashCards, setFlashcards] = useState<Flashcard[]>([]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createSet({
      _id: undefined,
      name: "New set",
      flashcards: [
        { concept: "ala ma kórwa czkawke ", definition: "kot" },
        { concept: "ala ma kórwa czkawke ", definition: "kot" },
        { concept: "ala ma kórwa czkawke ", definition: "kot" },
      ],
    });
  };

  const handleFlashCardAddition = (flashCard: Flashcard) => {
    setFlashcards((prev) => prev.concat(flashCard));
  };

  return (
    <form className="container bg-dark" onSubmit={handleSubmit}>
      <ul className=" list-group ">
        {flashCards.map((flashCard, index) => (
          <FlashcardForm flashCard={flashCard} key={index} index={index} />
        ))}
        <NewFlashCard onClick={handleFlashCardAddition} />
      </ul>
      <button className=" btn-primary " type="submit">
        Create
      </button>
    </form>
  );
}
