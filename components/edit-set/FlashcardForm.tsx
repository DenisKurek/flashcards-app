import Flashcard, { FlashcardBlueprint } from "@/lib/model/FlashCard";
import React from "react";
import CloseIcon from "../ui/CloseIcon";

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
    <li key={props.flashCard.id} className="card m-2 bg-gray-600">
      <div className="card-body p-1">
        <div className="card-actions justify-end">
          <button className="btn-sm">
            <CloseIcon onRemove={handleDelate} />
          </button>
        </div>
        <div className="flex p-2">
          <label className="label" htmlFor={`concept-${props.flashCard.id}`}>
            Concept:
          </label>
          <input
            type="text"
            className="input input-bordered input-secondary "
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
          <label className="label" htmlFor={`definition-${props.flashCard.id}`}>
            Definition:
          </label>
          <input
            type="text"
            className="input input-bordered input-secondary "
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
        </div>
      </div>
    </li>
  );
};

export default FlashcardForm;
