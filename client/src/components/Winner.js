import React, { useEffect, useState } from "react";
import { useGameState } from "../hooks/UseGameState";

const Winner = () => {
  const { stage, players, timer } = useGameState();

  // Identify the current player
  const currentPlayer = players.find((p) => p.id === p.myId);
  const isWinner = currentPlayer?.state?.isWinner;

  // Identify the actual winner from the players array
  const actualWinner = players.find((p) => p.state?.isWinner);

  const isTimerRanOut = stage === "winner" && !actualWinner;

  // If we're not in the 'winner' stage, show nothing
  const hasUsedAllGuesses = currentPlayer?.state?.guesses?.every(guess => guess !== null);
  const isLoser = hasUsedAllGuesses && !isWinner;

  if (stage !== "winner" && !isLoser) {
    return null;
  }

  const getAvatarUrl = (player) => {
    if (player?.state?.profile?.photo) {
      return player.state.profile.photo;
    }
    return '/defaultAvatar.jpg';
  };
  if (isTimerRanOut) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 loser">
        <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto text-black border-2 border-black">
          {/* Newspaper Header */}
          <div className="flex flex-col items-center mb-8">
            <h1
              className="text-3xl font-black mb-2"
              style={{
                fontFamily: "Playfair Display, serif",
                textShadow: "1px 1px #fff, 2px 2px #000",
              }}
            >
              Extra! Extra! You Fell Short!
            </h1>

            {/* Loser Icon */}
            <div className="w-full h-64 bg-gray-300 mb-4 mt-4 flex items-center justify-center border border-black">
              <span className="text-lg font-bold">
              <img src={getAvatarUrl(currentPlayer)} alt="Winner Avatar" />
              </span>
            </div>
          </div>

          {/* Newspaper Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-r-4 border-black pr-4">
              <p className="text-lg font-serif text-justify">
                Despite a valiant effort, your word-guessing prowess was no
                match for the competition. The puzzle proved elusive this time,
                and fortune favored the swift and the cunning. Take solace in
                the fact that you fought bravely until the very end!
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg font-serif text-justify">
                  As the final seconds ticked away, the mysterious word remained
                  uncracked. The challenge proved formidable, leaving all
                  contestants pondering what might have been. Time, the ultimate
                  adversary, claimed victory in today's battle of wits. The word
                  shall remain a mystery until next time!
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                {/* <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded loser-button"
                  onClick={() => window.location.reload()}
                >
                  Restart Game
                </button> */}
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
  }
  // If the current player is the winner, show the Winner screen
  return isWinner ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 winner">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto text-black border-2 border-black">
        {/* Newspaper Header */}
        <div className="flex flex-col items-center mb-8">
          <h1
            className="text-3xl font-black mb-2"
            style={{
              fontFamily: "Playfair Display, serif",
              textShadow: "1px 1px #fff, 2px 2px #000",
            }}
          >
            {currentPlayer.state.profile.name} Triumphs! 
          </h1>

          {/* User Icon */}
          <div className="w-full h-64 bg-gray-300 mb-4 mt-4 flex items-center justify-center border border-black">
            <span className="text-lg font-bold">
              <img src={getAvatarUrl(currentPlayer)} alt="Winner Avatar" />
            </span>
          </div>
        </div>

        {/* Newspaper Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-r-4 border-black pr-4">
            <p className="text-lg font-serif text-justify">
              In a dramatic showdown, <strong>{currentPlayer.state.profile.name}</strong> has
              emerged as the champion of today's word puzzle! The competition
              was intense, but {currentPlayer.state.profile.name}'s strategic brilliance and
              lightning-fast guesses outshone all rivals. The victory has
              already sparked excitement across the Discord community.
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-lg font-serif text-justify">
                Witnesses report that {currentPlayer.state.profile.name} solved the puzzle in
                record time, leaving opponents speechless. Many are already
                hailing {currentPlayer.state.profile.name} as the undisputed word master of
                the realm.
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              {/* <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded winner-button"
                onClick={() => window.location.reload()}
              >
                Restart Game
              </button> */}
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
  ) : (
    // Otherwise, show the Loser screen
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 loser">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto text-black border-2 border-black">
        {/* Newspaper Header */}
        <div className="flex flex-col items-center mb-8">
          <h1
            className="text-3xl font-black mb-2"
            style={{
              fontFamily: "Playfair Display, serif",
              textShadow: "1px 1px #fff, 2px 2px #000",
            }}
          >
            Extra! Extra! You Fell Short!
          </h1>

          {/* Loser Icon */}
          <div className="w-full h-64 bg-gray-300 mb-4 mt-4 flex items-center justify-center border border-black">
            <span className="text-lg font-bold">
            <img src={getAvatarUrl(currentPlayer)} alt="Winner Avatar" />
            </span>
          </div>
        </div>

        {/* Newspaper Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-r-4 border-black pr-4">
            <p className="text-lg font-serif text-justify">
              Despite a valiant effort, your word-guessing prowess was no match
              for the competition. The puzzle proved elusive this time, and
              fortune favored the swift and the cunning. Take solace in the fact
              that you fought bravely until the very end!
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-lg font-serif text-justify">
                Meanwhile, <strong>{actualWinner?.state.profile.name}</strong> claimed victory
                with lightning speed, stunning onlookers across the Discord
                realm. Rumor has it they're already basking in the glory of a
                well-earned triumph. Better luck next time!
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              {/* <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded loser-button"
                onClick={() => window.location.reload()}
              >
                Restart Game
              </button> */}
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
