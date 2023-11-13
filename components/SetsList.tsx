"use client";
import { useEffect, useState } from "react";
import Set from "@/lib/model/Set";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import { useRouter } from "next/navigation";
import CloseIcon from "./ui/CloseIcon";
import { ObjectId } from "mongodb";
import { LearningState } from "@/lib/model/FlashCard";

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
  return (
    <ul className="container">
      {props.sets.map((set, index) => (
        <div key={set._id.toString()} className="card m-5 flex bg-primary p-4">
          <div className="flex">
            <Link
              className="flex-grow"
              href={`edit-set/${set._id?.toString()}`}
              key={index}
            >
              {set.name}
            </Link>
            {props.onRemove ? (
              <div className="absolute right-2 ">
                <CloseIcon
                  onRemove={() => props.onRemove && props.onRemove(set._id)}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="">
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
