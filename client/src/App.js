import logo from "./logo.svg";
import "./App.css";
import Lobby from "./components/Lobby";
import { useState } from "react";
import GameUI from "./components/GameUI";
import { useGameState } from "./hooks/UseGameState";
import Winner from "./components/Winner";
import { useMultiplayerState } from "playroomkit";

function App() {
  const { timer, stage, currentPlayer } = useGameState();
  //const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [solutionWord, setSolutionWord] = useMultiplayerState("solutionWord", null);

  return (
    <>
      {stage === "lobby" && (
        <Lobby
          setSolutionWord={setSolutionWord}
          //setGuesses={setGuesses}
          setCurrentGuess={setCurrentGuess}
        />
      )}
      {stage === "game" && (
        <GameUI
          player={currentPlayer}
          guesses={currentPlayer.state.guesses}
          solutionWord={solutionWord}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          //setGuesses={setGuesses}
          setSolutionWord={setSolutionWord}
        />
      )}
      {stage === "winner" && <Winner  />}
    </>
  );
}

export default App;
