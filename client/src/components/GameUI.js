import React, { useEffect } from "react";
import Line from "./Line";
import { useGameState } from "../hooks/UseGameState";
import { handleType } from "../Logic/gameLogic";
import Keyboard from "./Keyboard";

const GameUI = ({
  player,
  solutionWord,
  guesses,
  currentGuess,
  setCurrentGuess,
  setGuesses,
  setSolutionWord,
}) => {
  const { timer, stage, host, endGame, TIMER_STAGE } = useGameState();

  const secondsToMinutesFormat = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getTimerColor = (currentTime) => {
    // Calculate percentage of time remaining
    const percentage = (currentTime / TIMER_STAGE.game) * 100;
    
    if (percentage <= 20) return 'text-red-600 animate-pulse'; // Last 20% - Critical
    if (percentage <= 35) return 'text-red-500'; // Last 35% - Danger
    if (percentage <= 50) return 'text-yellow-500'; // Last 50% - Warning
    return 'text-green-500'; // Above 50% - Safe
  };

  const handleKeyPress = (event) => {
    if (stage === "game") {
      handleType(
        event,
        currentGuess,
        setCurrentGuess,
        endGame,
        solutionWord,

        guesses,

        player
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (stage === "game") {
        handleType(
          event,
          currentGuess,
          setCurrentGuess,
          endGame,
          solutionWord,

          guesses,
          player
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    stage,
    setCurrentGuess,
    currentGuess,
    endGame,
    solutionWord,
    guesses,
    setSolutionWord,
  ]);

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
      <div className="max-w-4xl w-full bg-white shadow-xl text-center rounded-lg overflow-hidden p-6 transform transition-transform duration-300 hover:scale-105">
      <h1
          className={`text-3xl font-black mb-2 transition-colors duration-300 ${getTimerColor(timer)}`}
          style={{
            fontFamily: "Playfair Display, serif",
            textShadow: "1px 1px #fff, 2px 2px #000",
          }}
        >
          {secondsToMinutesFormat(timer)}
        </h1> 

        {guesses?.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((g) => g === null);
          return (
            <div key={i} className="flex justify-center mb-2">
              <Line
                guess={isCurrentGuess ? currentGuess : guess ?? ""}
                isFinal={!isCurrentGuess && guess != null}
                solutionWord={solutionWord}
              />
            </div>
          );
        })}
        <Keyboard
          solutionWord={solutionWord}
          guesses={guesses}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default GameUI;
