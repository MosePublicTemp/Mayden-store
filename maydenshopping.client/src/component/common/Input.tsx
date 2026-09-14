type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
};

const Input = (props: InputProps) => {
  return <input name={props.id} {...props}></input>;
};

export default Input;
