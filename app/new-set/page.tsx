"use client";
import FlashcardForm from "@/components/new-set/FlashcardForm";
import NewFlashCard from "@/components/new-set/NewFlashCard";
import {SetBlueprint} from "@/lib/model/Set";
import Flashcard from "@/lib/model/FlashCard";
import { useRef, useState } from "react";

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
  const [flashCards, setFlashcards] = useState<Flashcard[]>([]);
  const nameRef:any = useRef();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createSet({
      name: nameRef.current.value,
      flashcards: flashCards,
    });
  };

  const handleFlashCardAddition = (flashCard: Flashcard) => {
    setFlashcards((prev) => prev.concat(flashCard));
  };

  const handleFlashCardUpdate = (updatedFlashCard: Flashcard) => {
    setFlashcards((prev) => prev.map((flashCard)=> flashCard.id === updatedFlashCard.id? updatedFlashCard: flashCard ));
  };

  const handleFlashCardDelete = (deleteId: number) => {
    setFlashcards((prev) => prev.filter((flashCard)=> flashCard.id!= deleteId));
  };

  return (
    <form className="container bg-dark" onSubmit={handleSubmit}>
      <label htmlFor="set-name">Set Name: </label>
      <input id="set-name" type="text" className=" form-control" defaultValue={"new Set"} ref={nameRef} required/>
      <ul className=" list-group ">
        {flashCards.map((flashCard) => (
          <FlashcardForm 
          flashCard={flashCard} 
          key={flashCard.id}
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
