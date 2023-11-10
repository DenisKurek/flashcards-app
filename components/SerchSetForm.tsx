import TagSection from "@/components/edit-set/set-details/TagSection";
import { SearchParameters } from "@/lib/model/Set";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

interface Props {
  onSubmit: (SearchParameters: SearchParameters) => void;
}

const SetSearchForm: React.FC<Props> = (props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [possibleTags, setPossibleTags] = useState<string[]>([]);
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
      setPossibleTags(tags.map((tag: any) => tag.tag));
    }
    loadPossibleTags();
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const searchParameters: SearchParameters = {
      fromLanguage: fromLanguageRef.current.value,
      toLanguage: toLanguageRef.current.value,
      tags: selectedTags,
    };

    props.onSubmit(searchParameters);
  };

  const handleTagRemoval = (removedTag: string) => {
    setPossibleTags((prev) => prev.concat(removedTag));
    setSelectedTags((prev) => prev.filter((tag) => tag != removedTag));
  };

  const handleTagAddition = (addedTag: string) => {
    setSelectedTags((prev) => prev.concat(addedTag));
    setPossibleTags((prev) => prev.filter((tag) => tag != addedTag));
  };

  return (
    <form
      className="container card w-full space-y-3 bg-neutral p-3"
      onSubmit={handleSubmit}
    >
      <div className="flex">
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
      <div className="card bg-gray-500 text-black">
        <div className="card-body">
          <h3 className="card-title">Possible Tags</h3>
          <TagSection tags={possibleTags} onClick={handleTagAddition} />
        </div>
      </div>

      <div className="card bg-gray-500 text-black">
        <div className="card-body">
          <h3 className="card-title">Selected Tags</h3>
          <TagSection tags={selectedTags} onRemove={handleTagRemoval} />
        </div>
      </div>
      <div className="flex grow justify-center">
        <button className=" btn mt-auto w-1/3 bg-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};
export default SetSearchForm;
