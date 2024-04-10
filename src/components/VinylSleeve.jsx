import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { motion } from "framer-motion";

export default function VinylSleeve() {
  const { theme } = useContext(ThemeContext);
  return (
    <motion.div
      id="vinyl-sleeve"
      initial={{ opacity: 1, backgroundColor: "#6653ac" }}
      animate={{
        backgroundColor: theme === "artists" ? "#f6b6c6" : "#6ac3f3",
      }}
    ></motion.div>
  );
}
