import React from "react";
import TagInput from "./TagInput";
import TagSection from "./TagSection";
import TitleInput from "./TitleInput";

interface Props {
  name: string;
  nameRef: any;
  tags: string[];
  onTagsUpdate: any;
}

const SetDetails: React.FC<Props> = (props) => {
  const addTag = async (tag: string) => {
    if (props.tags.includes(tag)) {
      return;
    }
    props.onTagsUpdate((prev: string[]) => prev.concat(tag));

    const response = await fetch("/api/tag", {
      method: "POST",
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const removeTag = (deletedTag: string) => {
    props.onTagsUpdate((prev: string[]) =>
      prev.filter((tag) => tag != deletedTag),
    );
  };

  return (
    <div>
      <TitleInput title={props.name} titleRef={props.nameRef} />
      <div className="flex">
        <TagInput onNewTag={addTag} />
        {props.tags.length != 0 && (
          <TagSection tags={props.tags} onRemove={removeTag} />
        )}
      </div>
    </div>
  );
};

export default SetDetails;
