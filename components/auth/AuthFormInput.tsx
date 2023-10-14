interface Props {
  id: string;
  type: string;
  placeholder: string;
  label: string;
}

const AuthFormInput: React.FC<Props> = (props) => {
  return (
    <div className=" m-2 ">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        className="form-control "
        id={props.id}
        placeholder={props.placeholder}
        autoComplete="off"
        required
      />
    </div>
  );
};

export default AuthFormInput;
