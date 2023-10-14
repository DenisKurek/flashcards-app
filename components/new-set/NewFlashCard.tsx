import React from "react";
import UiFlashcard from "@/lib/ui-model/flashCard";

interface Props {
  onClick: (flashCard: UiFlashcard) => void;
}

const NewFlashCard: React.FC<Props> = (props) => {
  return (
    <li
      onClick={() => {
        props.onClick({uid:`id_${(new Date).getTime()}`, concept: "", definition: "" });
      }}
      className=" btn list-group-item text-center m-2"
      key="createNewFlashcard"
    >
      Create new Flashcard
    </li>
  );
};

export default NewFlashCard;
