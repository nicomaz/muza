import { useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import { ThemeContext } from "./contexts/Theme";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <ThemeContext.Provider value={{ theme }}>
      <Header />
      <HomePage />
    </ThemeContext.Provider>
  );
}

export default App;
