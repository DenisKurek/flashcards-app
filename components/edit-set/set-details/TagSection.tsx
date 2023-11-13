import CloseIcon from "@/components/ui/CloseIcon";

interface Props {
  tags: string[];
  onRemove?: (tag: string) => void;
  onClick?: (tag: string) => void;
}

const TagSection: React.FC<Props> = (props) => {
  return (
    <div className="container p-2">
      {props.tags.map((tag) => (
        <div
          key={tag}
          className={`badge badge-secondary m-2 gap-2 ${
            props.onClick ? "cursor-pointer " : ""
          }`}
          onClick={() => props.onClick && props.onClick(tag)}
        >
          {tag}
          {props.onRemove ? (
            <CloseIcon onRemove={() => props.onRemove && props.onRemove(tag)} />
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default TagSection;
