import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <header id="header" className={theme}>
      <h1>muza</h1>
    </header>
  );
}
