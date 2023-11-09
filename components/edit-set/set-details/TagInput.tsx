import { useRef } from "react";

interface Props {
  onNewTag: any;
}

const TagInput: React.FC<Props> = (props) => {
  const newTagRef: any = useRef();

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag: string = newTagRef.current.value;
      if (newTag) {
        newTagRef.current.value = "";
        props.onNewTag(newTag.toUpperCase());
      }
    }
  };

  return (
    <div className="container">
      <label htmlFor="tag-input" className="label">
        Add Tag:
      </label>
      <input
        type="text"
        className="input input-bordered input-primary w-full"
        placeholder="add tags"
        ref={newTagRef}
        onKeyDown={handleKeydown}
      />
    </div>
  );
};

export default TagInput;
