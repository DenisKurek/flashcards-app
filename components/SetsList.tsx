"use client";
import Set from "@/lib/model/Set";
import Link from "next/link";
import CloseIcon from "./ui/CloseIcon";
import { ObjectId } from "mongodb";
import { LearningState } from "@/lib/model/FlashCard";
import EditIcon from "./ui/EditIcon";
import { useRouter } from "next/navigation";

const StateColor = {
  [LearningState.NOT_STARTED]: "bg-red-900",
  [LearningState.RECENTLY_STARTED]: "bg-red-200",
  [LearningState.LEARNING]: "bg-yellow-400",
  [LearningState.ALMOST_MASTERED]: "bg-green-200",
  [LearningState.MASTERED]: "bg-green-500",
};

interface Props {
  sets: Set[];
  onRemove?: (ObjectId: ObjectId) => void;
}

const SetsList: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <ul className="container">
      {props.sets.map((set) => (
        <div key={set._id.toString()} className="card m-5 bg-primary p-4">
          <div className="flex">
            <h2
              className="card-title cursor-pointer"
              onClick={() => router.push(`learn-set/${set._id?.toString()}`)}
            >
              {set.name}
            </h2>
            <div className="card-actions flex-grow justify-end">
              <EditIcon
                onClick={() => router.push(`edit-set/${set._id?.toString()}`)}
              />
              {props.onRemove ? (
                <CloseIcon
                  onRemove={() => props.onRemove && props.onRemove(set._id)}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            {[
              LearningState.NOT_STARTED,
              LearningState.RECENTLY_STARTED,
              LearningState.LEARNING,
              LearningState.ALMOST_MASTERED,
              LearningState.MASTERED,
            ].map((state) => (
              <div
                key={state}
                className={`${
                  state && StateColor[state]
                } badge m-2 gap-2 text-black`}
              >
                {state + ": "}
                {
                  set.flashcards.filter((flashcard) => flashcard.state == state)
                    .length
                }
              </div>
            ))}
          </div>
        </div>
      ))}
    </ul>
  );
};

export default SetsList;
