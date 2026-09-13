import { useNavigate } from "react-router";
import Button from "./Button";

type To = "Shop" | "Shopping";

interface HeaderProps {
  title: string;
  to: To;
}

const Header = ({ title, to }: HeaderProps) => {
  var navigate = useNavigate();
  var url = to === "Shop" ? "shop" : "..";
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "darkgray",
        width: "100%",
        marginBottom: "5pt",
      }}
    >
      <h1 style={{ width: "20%", fontSize: "22pt", margin: "0.5em" }}>
        {title}
      </h1>
      <div style={{ width: "60%" }} />
      <div style={{ width: "20%" }}>
        <Button
          style={{
            margin: "auto",
          }}
          onClick={() => navigate(url)}
        >
          {to}
        </Button>
      </div>
    </div>
  );
};

export default Header;
