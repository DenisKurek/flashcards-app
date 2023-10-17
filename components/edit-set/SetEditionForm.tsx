import { SetBlueprint } from "@/lib/model/Set";
import FlashcardForm from "./FlashcardForm"
import NewFlashCard from "./NewFlashCard"
import React, { useState, useRef, useEffect } from "react";
import Flashcard from "@/lib/model/FlashCard";

interface Props{
    set: SetBlueprint;
    onSubmit: (set: SetBlueprint)=>void
}

const SetEditionForm: React.FC<Props> = (props)=> {
  const [flashCards, setFlashcards] = useState<Flashcard[]>(props.set.flashcards);
  const nameRef:any = useRef();

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
    setFlashcards((prev) => prev.map((flashCard)=> flashCard.id === updatedFlashCard.id? updatedFlashCard: flashCard ));
  };

  const handleFlashCardDelete = (deleteId: number) => {
    setFlashcards((prev) => prev.filter((flashCard)=> flashCard.id!= deleteId));
  };

  return( 
  <form className="container bg-dark" onSubmit={handleSubmit}>
    <label htmlFor="set-name">Set Name: </label>
    <input id="set-name" type="text" className=" form-control" defaultValue={props.set.name} ref={nameRef} required/>
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
    Save changes
  </button>
</form>
);
};

export default SetEditionForm;