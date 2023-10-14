import { FlashcardBlueprint } from "@/lib/model/flashcard";
import UiFlashcard from "@/lib/ui-model/flashCard";
import React from "react";

interface Props {
  flashCard: UiFlashcard;
  onUpdate: (flaschcard: UiFlashcard) => void;
  onDelete: (uid: string) => void;
}

const FlashcardForm: React.FC<Props> = (props) => {
  const handleUpdate = (updatedFlashcard: FlashcardBlueprint)=>{
    props.onUpdate({
      ...updatedFlashcard,
      uid:props.flashCard.uid
    })
  }

  const handleDelate = ()=>{
    props.onDelete(props.flashCard.uid)
  }

  return (
    <li className=" card list-group-item m-2">
      <div className="row">
        <label htmlFor={`concept-${props.flashCard.uid}`}>Concept:</label>
        <input
          type="text"
          className="form-control"
          id={`concept-${props.flashCard.uid}`}
          defaultValue={props.flashCard.concept}
          onChange={(e)=>handleUpdate({
            concept:e.target.value,
            definition: props.flashCard.definition
          })}
        />
      </div>
      <div className="row">
        <label htmlFor={`definition-${props.flashCard.uid}`}>Definition:</label>
        <input
          type="text"
          className="form-control"
          id={`definition-${props.flashCard.uid}`}
          defaultValue={props.flashCard.definition}
          onChange={(e)=>handleUpdate({
            concept: props.flashCard.concept, 
            definition: e.target.value
          })}
        />
      </div>
      <button className="btn-danger" onClick={handleDelate}>delete</button>
    </li>
  );
};

export default FlashcardForm;
