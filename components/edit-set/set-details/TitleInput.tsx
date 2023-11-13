interface Props {
  titleRef: any;
  title: string;
}

const TitleInput: React.FC<Props> = (props) => {
  return (
    <div>
      <label htmlFor="set-name" className="label">
        Set Name:
      </label>
      <input
        id="set-name"
        type="text"
        className="input input-bordered input-primary w-full"
        defaultValue={props.title}
        ref={props.titleRef}
        required
      />
    </div>
  );
};

export default TitleInput;
