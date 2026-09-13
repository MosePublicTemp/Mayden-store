type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button = (props: ButtonProps) => {
  return (
    <button
      style={{
        marginLeft: "3pt",
        marginRight: "3pt",
        marginTop: "2pt",
        marginBottom: "2pt",
      }}
      {...props}
    />
  );
};

export default Button;
