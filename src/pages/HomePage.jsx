import { ThemeContext } from "../contexts/Theme";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import VinylSleeve from "../components/VinylSleeve";
import Vinyl from "../components/Vinyl";

export default function HomePage() {
  const { theme } = useContext(ThemeContext);
  const [degree, setDegree] = useState(0);

  return (
    <motion.div
      className="background"
      initial={{ opacity: 1, backgroundColor: "#f6b6c6" }}
      animate={{ backgroundColor: theme === "songs" ? "#f6b6c6" : "#6ac3f3" }}
    >
      <div className="container">
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={{
            rotate: degree,

            originX: 0.5,
            originY: 0.5,
          }}
          transition={{ duration: 1, originX: 0.5, originY: 0.5 }}
        >
          <Vinyl />
        </motion.div>
        <VinylSleeve />
      </div>
    </motion.div>
  );
}
