interface Props {
  onClick?: () => void;
}

const FlipIcon: React.FC<Props> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block h-4 w-4 cursor-pointer stroke-current"
      onClick={props.onClick}
    >
      <polyline points="17 1 21 5 17 9" /> <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 13v2a4 4 0 0 1-4 4H3"
      />
    </svg>
  );
};

export default FlipIcon;
