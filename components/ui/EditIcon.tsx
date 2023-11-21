interface Props {
  onClick?: () => void;
}

const EditIcon: React.FC<Props> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="inline-block h-4 w-4 cursor-pointer stroke-current"
      onClick={props.onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
      />
    </svg>
  );
};

export default EditIcon;
