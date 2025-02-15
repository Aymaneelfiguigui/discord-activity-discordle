import React, { useEffect } from "react";
import Line from "./Line";
import { useGameState } from "../hooks/UseGameState";
import { handleType } from "../Logic/gameLogic";
import Keyboard from "./Keyboard";

const GameUI = ({ player, solutionWord, guesses, currentGuess, setCurrentGuess, setGuesses }) => {
  const { timer, stage, host, startGame, endGame } = useGameState();

  const secondsToMinutesFormat = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (stage === "game") {
        handleType(event, currentGuess, setCurrentGuess, endGame, solutionWord, guesses, setGuesses);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [stage, setCurrentGuess, currentGuess, endGame, solutionWord, guesses, setGuesses]);

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-[#f4e6cc] p-4"
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.1) 2px, transparent 2px),
          radial-gradient(circle, rgba(0,0,0,0.1) 2px, transparent 2px)
        `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    >
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden p-6 transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-4 text-shadow-md text-red-500">
          {secondsToMinutesFormat(timer)}
        </h1>

        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((g) => g === null);
          return (
            <div key={i} className="flex justify-center mb-2">
              <Line guess={isCurrentGuess ? currentGuess : guess ?? ''} isFinal={!isCurrentGuess && guess != null} solutionWord={solutionWord} />
            </div>
          );
        })}
          <Keyboard solutionWord={solutionWord} guesses={guesses} />

      </div>
    </div>
  );
};

export default GameUI;
