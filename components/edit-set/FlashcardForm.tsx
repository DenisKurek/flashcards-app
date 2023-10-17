import Flashcard, { FlashcardBlueprint } from "@/lib/model/FlashCard";
import React from "react";

interface Props {
  flashCard: Flashcard;
  onUpdate: (flaschcard: Flashcard) => void;
  onDelete: (id: number) => void;
}

const FlashcardForm: React.FC<Props> = (props) => {
  const handleUpdate = (updatedFlashcard: FlashcardBlueprint) => {
    props.onUpdate({
      ...updatedFlashcard,
      id: props.flashCard.id,
    });
  };

  const handleDelate = () => {
    props.onDelete(props.flashCard.id);
  };

  return (
    <li key={props.flashCard.id} className=" card list-group-item m-2">
      <div className="row">
        <label htmlFor={`concept-${props.flashCard.id}`}>Concept:</label>
        <input
          type="text"
          className="form-control"
          id={`concept-${props.flashCard.id}`}
          defaultValue={props.flashCard.concept}
          onChange={(e) =>
            handleUpdate({
              concept: e.target.value,
              definition: props.flashCard.definition,
            })
          }
        />
      </div>
      <div className="row">
        <label htmlFor={`definition-${props.flashCard.id}`}>Definition:</label>
        <input
          type="text"
          className="form-control"
          id={`definition-${props.flashCard.id}`}
          defaultValue={props.flashCard.definition}
          onChange={(e) =>
            handleUpdate({
              concept: props.flashCard.concept,
              definition: e.target.value,
            })
          }
        />
      </div>
      <button className="btn-danger" onClick={handleDelate}>
        delete
      </button>
    </li>
  );
};

export default FlashcardForm;
