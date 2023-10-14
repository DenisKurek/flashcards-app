"use client";
import FlashcardForm from "@/components/new-set/FlashcardForm";
import NewFlashCard from "@/components/new-set/NewFlashCard";
import {SetBlueprint} from "@/lib/model/Set";
import UiFlashcard from "@/lib/ui-model/flashCard";
import { useState } from "react";

async function createSet(set: SetBlueprint) {
  const response = await fetch("api/v1/set", {
    method: "POST",
    body: JSON.stringify(set),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function HomePage() {
  const [flashCards, setFlashcards] = useState<UiFlashcard[]>([]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createSet({
      name: "New set",
      flashcards: [
        { concept: "ala ma kórwa czkawke ", definition: "kot" },
        { concept: "ala ma kórwa czkawke ", definition: "kot" },
        { concept: "ala ma kórwa czkawke ", definition: "kot" },
      ],
    });
  };

  const handleFlashCardAddition = (flashCard: UiFlashcard) => {
    setFlashcards((prev) => prev.concat(flashCard));
  };

  const handleFlashCardUpdate = (updatedFlashCard: UiFlashcard) => {
    setFlashcards((prev) => prev.map((flashCard)=> flashCard.uid === updatedFlashCard.uid? updatedFlashCard: flashCard ));
  };

  const handleFlashCardDelete = (deleteId:string) => {
    setFlashcards((prev) => prev.filter((flashCard)=> flashCard.uid!= deleteId));
  };

  return (
    <form className="container bg-dark" onSubmit={handleSubmit}>
      <ul className=" list-group ">
        {flashCards.map((flashCard) => (
          <FlashcardForm flashCard={flashCard} 
          key={flashCard.uid}
          onUpdate={handleFlashCardUpdate}
          onDelete={handleFlashCardDelete}/>
        ))}
        <NewFlashCard onClick={handleFlashCardAddition} />
      </ul>
      <button className="btn-primary" type="submit">
        Create
      </button>
    </form>
  );
}
