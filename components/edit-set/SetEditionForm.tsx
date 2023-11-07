import { SetBlueprint } from "@/lib/model/Set";
import FlashcardForm from "./FlashcardForm";
import NewFlashCard from "./NewFlashCard";
import React, { useState, useRef, useEffect } from "react";
import Flashcard from "@/lib/model/FlashCard";
import SetDetails from "./SetDetails";

interface Props {
  set: SetBlueprint;
  onSubmit: (set: SetBlueprint) => void;
}

const SetEditionForm: React.FC<Props> = (props) => {
  const [flashCards, setFlashcards] = useState<Flashcard[]>(
    props.set.flashcards,
  );
  const nameRef: any = useRef();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit({
      name: nameRef.current.value,
      flashcards: flashCards,
    });
  };

  const handleFlashCardAddition = (flashCard: Flashcard) => {
    setFlashcards((prev) => prev.concat(flashCard));
  };

  const handleFlashCardUpdate = (updatedFlashCard: Flashcard) => {
    setFlashcards((prev) =>
      prev.map((flashCard) =>
        flashCard.id === updatedFlashCard.id ? updatedFlashCard : flashCard,
      ),
    );
  };

  const handleFlashCardDelete = (deleteId: number) => {
    setFlashcards((prev) =>
      prev.filter((flashCard) => flashCard.id != deleteId),
    );
  };

  return (
    <form
      className="container card w-full space-y-3 bg-neutral p-3"
      onSubmit={handleSubmit}
    >
      <SetDetails name={props.set.name} nameRef={nameRef}/>

      <ul>
        {flashCards.map((flashCard) => (
          <FlashcardForm
            flashCard={flashCard}
            key={flashCard.id}
            onUpdate={handleFlashCardUpdate}
            onDelete={handleFlashCardDelete}
          />
        ))}
        <NewFlashCard onClick={handleFlashCardAddition} />
      </ul>
      <div className="flex grow justify-center">
        <button className=" btn mt-auto w-1/3 bg-primary" type="submit">
          Save changes
        </button>
      </div>
    </form>
  );
};

export default SetEditionForm;
