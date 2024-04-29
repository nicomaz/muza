import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { motion } from "framer-motion";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <motion.div
      className="header__bg"
      initial={{ opacity: 1, backgroundColor: "#f6b6c6" }}
      animate={{ backgroundColor: theme === "songs" ? "#f6b6c6" : "#6ac3f3" }}
    >
      <header id="header" className={theme}>
        <h1>muza</h1>
      </header>
    </motion.div>
  );
}
