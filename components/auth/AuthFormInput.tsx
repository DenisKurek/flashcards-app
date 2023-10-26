interface Props {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  customRef: any;
}

const AuthFormInput: React.FC<Props> = (props) => {
  return (
    <div className=" m-2 ">
      <label htmlFor={props.id} className="label ">
        {props.label}
      </label>
      <input
        type={props.type}
        className="input input-bordered input-secondary w-full"
        id={props.id}
        placeholder={props.placeholder}
        autoComplete="off"
        ref={props.customRef}
        required
      />
    </div>
  );
};

export default AuthFormInput;
