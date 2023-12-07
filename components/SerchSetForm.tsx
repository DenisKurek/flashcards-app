import Set, { SearchParameters } from "@/lib/model/Set";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import SetsList from "./SetsList";

interface Props {
  error?: string;
  sets: Set[] | undefined;
  onSubmit: (SearchParameters: SearchParameters) => void;
}

interface Tag {
  label: string;
  selected: boolean;
}

const SetSearchForm: React.FC<Props> = (props) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const fromLanguageRef: any = useRef();
  const toLanguageRef: any = useRef();

  useEffect(() => {
    async function loadPossibleTags() {
      const response = await fetch(`/api/tag`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw console.error(response);
      }
      const { tags } = await response.json();
      setTags(
        tags.map((tag: any) => {
          return {
            label: tag.tag,
            selected: false,
          };
        }),
      );
    }
    loadPossibleTags();
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(tags.filter((tag) => tag.selected));
    const searchParameters: SearchParameters = {
      fromLanguage: fromLanguageRef.current.value,
      toLanguage: toLanguageRef.current.value,
      tags: tags.filter((tag) => tag.selected).map((tag) => tag.label),
    };

    props.onSubmit(searchParameters);
  };

  return (
    <form
      className="container card w-full min-w-fit space-y-3 bg-neutral p-3"
      onSubmit={handleSubmit}
    >
      {props.error && <ErrorMessage message={props.error} />}
      <div className="flex ">
        <label
          className="input-group input-group-vertical mx-2"
          htmlFor={`language-from`}
        >
          <span className=" bg-gray-400 text-black">From</span>
          <input
            type="text"
            className="input input-bordered input-secondary "
            id={`language-from`}
            defaultValue={"English"}
            ref={fromLanguageRef}
          />
        </label>

        <label
          className="input-group input-group-vertical mx-2"
          htmlFor={`language-to`}
        >
          <span className=" bg-gray-400 text-black">To</span>
          <input
            type="text"
            className="input input-bordered input-secondary "
            id={`language-to`}
            defaultValue={"Polish"}
            ref={toLanguageRef}
          />
        </label>
      </div>
      <div className="container p-2">
        {tags.map((tag) => (
          <div key={tag.label} className="badge badge-secondary m-2 gap-2">
            {tag.label}
            <input
              type="checkbox"
              defaultChecked={false}
              className="checkbox checkbox-xs"
              onChange={() =>
                setTags((prev) =>
                  prev.map((prevTag) =>
                    prevTag.label === tag.label
                      ? { ...prevTag, selected: !prevTag.selected }
                      : prevTag,
                  ),
                )
              }
            />
          </div>
        ))}
      </div>
      {props.sets && (
        <div className="container p-2">
          <SetsList sets={props.sets} />
        </div>
      )}

      <div className="flex grow justify-center">
        <button className=" btn mt-auto w-1/3 bg-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};
export default SetSearchForm;
