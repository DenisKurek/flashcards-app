import Flashcard from "@/lib/ui-model/flashcard";
import React from "react";

interface Props {
  flashCard: Flashcard;
  index: number;
}

const FlashcardForm: React.FC<Props> = (props) => {
  return (
    <li className=" card list-group-item m-2">
      <div className="row">
        <label htmlFor={`concept-${props.index}`}>Concept:</label>
        <input
          type="text"
          className="form-control"
          id={`concept-${props.index}`}
          defaultValue={props.flashCard.concept}
        />
      </div>
      <div className="row">
        <label htmlFor={`definition-${props.index}`}>Definition:</label>
        <input
          type="text"
          className="form-control"
          id={`definition-${props.index}`}
          defaultValue={props.flashCard.definition}
        />
      </div>
      <button className=" btn-danger"> delete</button>
    </li>
  );
};

export default FlashcardForm;
