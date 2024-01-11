"use client";
import { searchForSet } from "@/lib/actions";
import { experimental_useFormState } from "react-dom";
import Link from "next/link";
import { LearningState, StateColor } from "@/lib/model/FlashCard";

interface Props {
  tags: string[];
}

export default function SetSearchForm(props: Props) {
  const [sets, formAction] = experimental_useFormState(searchForSet, []);

  return (
    <form
      className="container card w-full min-w-fit space-y-3 bg-neutral p-3"
      action={formAction}
    >
      <div className="flex ">
        <label
          className="input-group input-group-vertical mx-2"
          htmlFor={`language-from`}
        >
          <span className=" bg-gray-400 text-black">From</span>
          <input
            type="text"
            name="language-from"
            className="input input-bordered input-secondary "
            id={`language-from`}
            defaultValue={"English"}
          />
        </label>

        <label
          className="input-group input-group-vertical mx-2"
          htmlFor={`language-to`}
        >
          <span className=" bg-gray-400 text-black">To</span>
          <input
            type="text"
            name="language-to"
            className="input input-bordered input-secondary "
            id={`language-to`}
            defaultValue={"Polish"}
          />
        </label>
      </div>
      <div className="container p-2">
        {props.tags.map((tag) => (
          <div key={tag} className="badge badge-secondary m-2 gap-2">
            {tag}
            <input
              type="checkbox"
              name="tag"
              value={tag}
              defaultChecked={false}
              className="checkbox checkbox-xs"
            />
          </div>
        ))}
      </div>
      {sets && (
        <div className="container p-2">
          <ul className="container">
            {sets.map((set) => (
              <div
                key={set._id.toString()}
                className="card m-5 flex min-w-[500px] bg-primary p-4"
              >
                <Link
                  href={`search-set/${set._id.toString()}`}
                  className=" min-w-fit"
                >
                  <h2 className="card-title">{set.name}</h2>
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
                          set.flashcards.filter(
                            (flashcard) => flashcard.state == state,
                          ).length
                        }
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
      <div className="flex grow justify-center">
        <button className=" btn mt-auto w-1/3 bg-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
