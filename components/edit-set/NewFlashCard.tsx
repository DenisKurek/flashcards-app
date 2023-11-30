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
          lastUpdate: new Date(),
        });
      }}
      className="btn btn-secondary btn-outline m-2 flex"
      key="createNewFlashcard"
    >
      +
    </li>
  );
};

export default NewFlashCard;
