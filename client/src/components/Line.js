import React, { useEffect, useState } from "react";

const Line = ({ guess, isFinal, solutionWord }) => {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    console.log("solution word", solutionWord)
    const newTiles = [];
    for (let i = 0; i < 5; i++) {
      const char = guess[i];
      let className =
        "w-14 h-14 flex items-center justify-center text-[28px] font-bold text-white bg-white border-2 border-black   shadow-md transform transition-transform duration-300 hover:scale-110";

      if (isFinal) {
        if (char === solutionWord.charAt(i)) {
          className += " bg-green-500 text-white flip-correct";
        } else if (solutionWord.includes(char)) {
          className += " bg-yellow-500 flip-present";
        } else {
          className += " bg-gray-500 flip-absent";
        }
      } else if (char) {
        className += " bg-gray-200 text-black fill-tile";
      }

      newTiles.push(
        <div key={i} className={className}>
          {char}
        </div>
      );
    }
    setTiles(newTiles);
  }, [guess, isFinal, solutionWord]);

  return <div className="flex gap-2">{tiles}</div>;
};

export default Line;
