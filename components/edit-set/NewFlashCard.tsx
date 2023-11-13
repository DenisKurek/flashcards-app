import React from "react";
import Flashcard, { LearningState } from "@/lib/model/FlashCard";

interface Props {
  onClick: (flashCard: Flashcard) => void;
}

const NewFlashCard: React.FC<Props> = (props) => {
  return (
    <li
      onClick={() => {
        props.onClick({
          id: new Date().getTime(),
          concept: "",
          definition: "",
          state: LearningState.NOT_STARTED,
        });
      }}
      className="btn m-2 flex bg-secondary "
      key="createNewFlashcard"
    >
      Create new Flashcard
    </li>
  );
};

export default NewFlashCard;
