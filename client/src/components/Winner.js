import React, { useEffect, useState } from "react";
import { useGameState } from "../hooks/UseGameState";

const Winner = () => {
  const { stage, players, timer } = useGameState();

  const currentPlayer = players.find(p => p.id === p.myId);

  const isWinner = currentPlayer?.state?.isWinner;




  if (stage !== "winner" || !isWinner) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 winner">
      <div className="relative bg-[#ffffff] p-8 rounded-lg shadow-lg max-w-3xl mx-auto text-black">
        {/* Newspaper Header */}
        <div className="flex flex-col items-center mb-8">
          <h1
            className="text-3xl font-black mb-2 text-shadow-lg"
            style={{
              fontFamily: "Playfair Display, serif",
            }}
          >
            {currentPlayer.name} Triumphs! {timer}
          </h1>

          {/* User Icon */}
          <div className="w-full h-64 bg-gray-300 mb-4 mt-4">
            {/* Placeholder for the user icon */}
          </div>
        </div>

        {/* Newspaper Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-r-4 border-black pr-4">
            <p className="text-lg font-serif text-justify">
              In a dramatic showdown, {currentPlayer.name} has emerged as the champion of today's word puzzle! The competition was intense, but {currentPlayer.name}'s strategic brilliance and lightning-fast guesses outshone all rivals. The victory has already sparked excitement across the Discord community.
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-lg font-serif text-justify">
                Witnesses report that {currentPlayer.name} solved the puzzle in record time, leaving opponents speechless. Many are already hailing {currentPlayer.name} as the undisputed word master of the realm.
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded winner-button"
                onClick={() => window.location.reload()}
              >
                Restart Game
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm font-serif italic text-black/60">
            Join the Discord server for more epic word battles!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Winner;
