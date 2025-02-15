import logo from "./logo.svg";
import "./App.css";
import Lobby from "./components/Lobby";
import { useState } from "react";
import GameUI from "./components/GameUI";
import { useGameState } from "./hooks/UseGameState";

function App() {
  const { timer, stage, host, startGame } = useGameState();
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const solutionWord = "WORLD";
  return (
    <>
      {stage === "lobby" && <Lobby />}
      {stage === "game" && (
        <GameUI
          guesses={guesses}
          solutionWord={solutionWord}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          setGuesses={setGuesses}
        />
      )}
    </>
  );
}

export default App;
