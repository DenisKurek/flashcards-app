import Flashcard, {
  FlashcardBlueprint,
  getStateColor,
} from "@/lib/model/FlashCard";
import React from "react";
import { LearningState } from "@/lib/model/FlashCard";
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
    <li
      key={props.flashCard.id}
      className={`card m-2 text-black ${getStateColor(props.flashCard.state)}`}
    >
      <div className="card-body p-1">
        <div className="card-action flex">
          <div className="input-group-sm flex-grow">
            <select
              className="select-sm bg-transparent"
              value={props.flashCard.state}
              onChange={(e) =>
                handleUpdate({
                  concept: props.flashCard.concept,
                  definition: props.flashCard.definition,
                  state: e.target.value as LearningState,
                })
              }
            >
              <option
                className={
                  getStateColor(LearningState.NOT_STARTED) + " text-black"
                }
                key={LearningState.NOT_STARTED}
              >
                {LearningState.NOT_STARTED}
              </option>
              <option
                className={
                  getStateColor(LearningState.RECENTLY_STARTED) + " text-black"
                }
                key={LearningState.RECENTLY_STARTED}
              >
                {LearningState.RECENTLY_STARTED}
              </option>
              <option
                className={
                  getStateColor(LearningState.LEARNING) + " text-black"
                }
                key={LearningState.LEARNING}
              >
                {LearningState.LEARNING}
              </option>
              <option
                className={
                  getStateColor(LearningState.ALMOST_MASTERED) + " text-black"
                }
                key={LearningState.ALMOST_MASTERED}
              >
                {LearningState.ALMOST_MASTERED}
              </option>
              <option
                className={
                  getStateColor(LearningState.MASTERED) + " text-black"
                }
                key={LearningState.MASTERED}
              >
                {LearningState.MASTERED}
              </option>
            </select>
          </div>
          <button className="m-2 flex">
            <CloseIcon onRemove={handleDelate} />
          </button>
        </div>
        <div className="flex p-2">
          <label
            className="input-group input-group-vertical mx-2"
            htmlFor={`concept-${props.flashCard.id}`}
          >
            <span className=" bg-gray-400">Concept:</span>
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
                  state: props.flashCard.state,
                })
              }
            />
          </label>
          <label
            className="input-group input-group-vertical mx-2"
            htmlFor={`definition-${props.flashCard.id}`}
          >
            <span className=" bg-gray-400"> Definition:</span>
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
                  state: props.flashCard.state,
                })
              }
            />
          </label>
        </div>
      </div>
    </li>
  );
};

export default FlashcardForm;
