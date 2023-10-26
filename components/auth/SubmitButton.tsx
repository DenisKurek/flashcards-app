interface Props {
  loading: boolean;
}

const SubmitButton: React.FC<Props> = (props) => {
  return (
    <button
      type="submit"
      className="first-line:text-md mx-auto flex w-1/3 justify-center rounded-md bg-primary p-4 font-medium "
      disabled={props.loading}
    >
      {props.loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        "Submit"
      )}
    </button>
  );
};

export default SubmitButton;
