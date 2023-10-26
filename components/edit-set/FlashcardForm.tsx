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
    <li
      key={props.flashCard.id}
      className="card m-2 flex space-y-2 bg-gray-600 p-4"
    >
      <label htmlFor={`concept-${props.flashCard.id}`}>Concept:</label>
      <input
        type="text"
        className="input input-bordered input-secondary w-full "
        id={`concept-${props.flashCard.id}`}
        defaultValue={props.flashCard.concept}
        placeholder="concept"
        onChange={(e) =>
          handleUpdate({
            concept: e.target.value,
            definition: props.flashCard.definition,
          })
        }
      />
      <label htmlFor={`definition-${props.flashCard.id}`}>Definition:</label>
      <input
        type="text"
        className="input input-bordered input-secondary w-full "
        id={`definition-${props.flashCard.id}`}
        defaultValue={props.flashCard.definition}
        placeholder="definition"
        onChange={(e) =>
          handleUpdate({
            concept: props.flashCard.concept,
            definition: e.target.value,
          })
        }
      />
      <button
        key={`delete-${props.flashCard.id}`}
        className="btn bg-primary"
        onClick={handleDelate}
      >
        delete
      </button>
    </li>
  );
};

export default FlashcardForm;
