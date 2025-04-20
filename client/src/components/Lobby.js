import { useState } from "react";
import { usePlayersList } from "playroomkit";
import { useGameState } from "../hooks/UseGameState";

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const WordleLobby = ({setSolutionWord, setCurrentGuess }) => {
  const {  startGame, players, stage } = useGameState();

  console.log("players are here : ", players[0]);
  players.forEach((player) => {
    player.name = `user ${player.id[0]}`;
  });
  const isGameInProgress = stage === "game";

  // If game is in progress, show waiting screen


  return (
    <div
      className="h-screen flex items-center justify-center bg-[#f4e6cc] p-4"
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(0,0,0,0.1) 2px, transparent 2px),
          radial-gradient(circle, rgba(0,0,0,0.1) 2px, transparent 2px)
        `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    >
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
        {/* Vintage paper texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Main Content */}
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6 border-b-4 border-black pb-4">
            <h1
              className="text-5xl font-black mb-2 text-shadow-lg"
              style={{
                fontFamily: "Playfair Display, serif",
                textShadow: "2px 2px #fff, 4px 4px #000",
              }}
            >
              DISCORDLE TIMES
            </h1>
            <div className="flex justify-center items-center gap-4 text-lg">
              <div className="h-px bg-black flex-1" />
              <p className="font-serif italic">Est. 2024</p>
              <div className="h-px bg-black flex-1" />
            </div>
          </div>

          {/* Players Section */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <h2
                className="text-3xl font-bold mb-4 text-shadow-md"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                PLAYERS GAZETTE
              </h2>
              <div className="space-y-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="group relative bg-[#e8d5b5] border-2 border-black/40 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                  >
                    <div className="p-4 flex items-center justify-between">
                      {player.state.profile.name ? (
                        <div className="flex items-center gap-3">
                          <UserIcon />
                          <span className="font-serif text-xl">
                            {player.state.profile.name}
                          </span>
                        </div>
                      ) : (
                        <button
                          //   onClick={joinAsPlayer}
                          className="flex items-center gap-3 text-black/60 hover:text-black transition-colors italic w-full"
                        >
                          <UserIcon />
                          <span className="font-serif text-xl">
                            {player.state.name}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="mt-6 text-center">
            <button
              className={`
                relative group overflow-hidden bg-black text-white px-8 py-2 text-xl font-bold rounded-lg transition-transform duration-300 transform ${
                  players.some((p) => p.name)
                    ? "hover:scale-110"
                    : "cursor-not-allowed opacity-50"
                }
              `}
              onClick={()=> startGame(setSolutionWord, setCurrentGuess)}
            >
              <div className="absolute inset-0 bg-black/20 transform -skew-x-12 group-hover:skew-x-12 transition-transform" />
              <span className="relative font-serif tracking-widest">
                START THE PRESS
              </span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t-2 border-black/20 text-center">
            <p className="font-serif italic text-black/60 text-sm">
              Join the Voice Telegraph to participate in today's word puzzle
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordleLobby;
