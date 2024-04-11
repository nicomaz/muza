import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { motion } from "framer-motion";
import CarouselButton from "./CarouselButton";

export default function VinylSleeve({ vinySleeveRef, setDegree, degree }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div id="sleeve-container">
      <CarouselButton
        setDegree={setDegree}
        degree={degree}
        number={-180}
        direction="left"
      />
      <motion.div
        ref={vinySleeveRef}
        id="vinyl-sleeve"
        initial={{ opacity: 1, backgroundColor: "#6653ac" }}
        animate={{
          backgroundColor: theme === "artists" ? "#f6b6c6" : "#6ac3f3",
        }}
      ></motion.div>
      <CarouselButton
        setDegree={setDegree}
        degree={degree}
        number={180}
        direction="right"
      />
    </div>
  );
}
