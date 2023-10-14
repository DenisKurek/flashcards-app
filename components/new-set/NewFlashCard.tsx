import React from "react";
import Flashcard from "@/lib/ui-model/flashcard";
import { conntectToDatabase } from "@/lib/utils/db";
interface Props {
  onClick: (flashCard: Flashcard) => void;
}

const NewFlashCard: React.FC<Props> = (props) => {
  return (
    <li
      onClick={() => {
        props.onClick({ concept: "", definition: "" });
      }}
      className=" btn list-group-item text-center m-2"
      key="createNewFlashcard"
    >
      Create new Flashcard
    </li>
  );
};

export default NewFlashCard;
