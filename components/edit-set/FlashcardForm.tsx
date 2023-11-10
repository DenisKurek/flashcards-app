import Flashcard, { FlashcardBlueprint } from "@/lib/model/FlashCard";
import React from "react";
import { LearningState } from "@/lib/model/FlashCard";
import { LanguageSettings } from "@/lib/model/Set";
import CloseIcon from "../ui/CloseIcon";

interface Props {
  flashCard: Flashcard;
  onUpdate: (flaschcard: Flashcard) => void;
  onDelete: (id: number) => void;
  language: LanguageSettings;
  onLanguageChange: (newSettings: LanguageSettings) => void;
}

const StateColor = {
  [LearningState.NOT_STARTED]: "bg-red-900",
  [LearningState.RECENTLY_STARTED]: "bg-red-200",
  [LearningState.LEARNING]: "bg-yellow-400",
  [LearningState.ALMOST_MASTERED]: "bg-green-200",
  [LearningState.MASTERED]: "bg-green-500",
};

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
      className={`card m-2 ${StateColor[props.flashCard.state]}`}
    >
      <div className="card-body p-1">
        <div
          className="card-action flex
"
        >
          <div className="input-group-sm flex-grow">
            <select
              className=" select-sm bg-transparent text-black"
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
                className={StateColor[LearningState.NOT_STARTED]}
                key={LearningState.NOT_STARTED}
              >
                {LearningState.NOT_STARTED}
              </option>
              <option
                className={StateColor[LearningState.RECENTLY_STARTED]}
                key={LearningState.RECENTLY_STARTED}
              >
                {LearningState.RECENTLY_STARTED}
              </option>
              <option
                className={StateColor[LearningState.LEARNING]}
                key={LearningState.LEARNING}
              >
                {LearningState.LEARNING}
              </option>
              <option
                className={StateColor[LearningState.ALMOST_MASTERED]}
                key={LearningState.ALMOST_MASTERED}
              >
                {LearningState.ALMOST_MASTERED}
              </option>
              <option
                className={StateColor[LearningState.MASTERED]}
                key={LearningState.MASTERED}
              >
                {LearningState.MASTERED}
              </option>
            </select>
          </div>
          <button className="m-2 flex text-black">
            <CloseIcon onRemove={handleDelate} />
          </button>
        </div>
        <div className="flex p-2">
          <label
            className="input-group input-group-vertical mx-2"
            htmlFor={`concept-${props.flashCard.id}`}
          >
            <span className=" bg-gray-400 text-black">
              {"Concept: "}
              <input
                type="text"
                className="input-small flex flex-grow bg-transparent text-center"
                id={`concept-language-${props.flashCard.id}`}
                value={props.language.concept}
                onChange={(e) =>
                  props.onLanguageChange({
                    concept: e.target.value,
                    definition: props.language.definition,
                  })
                }
              />
            </span>
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
            <span className=" flex bg-gray-400 text-black">
              {"Definition: "}
              <input
                type="text"
                className="input-small flex flex-grow bg-transparent text-center"
                id={`definition-language-${props.flashCard.id}`}
                value={props.language.definition}
                onChange={(e) =>
                  props.onLanguageChange({
                    concept: props.language.concept,
                    definition: e.target.value,
                  })
                }
              />
            </span>
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
