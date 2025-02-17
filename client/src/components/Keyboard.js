import React, { useEffect, useState } from "react";

function getLetterColor(guesses, solutionWord, letter) {
    // If no guesses made yet, return unused
    if (!guesses.some(guess => guess !== null)) {
        return "unused";
    }

    let bestColor = "unused";
    const upperSolution = solutionWord.toUpperCase();
    
    // Only check letters that have been guessed
    const guessedLetters = guesses
        .filter(guess => guess !== null)
        .map(guess => guess.toUpperCase());
    
    // If letter hasn't been guessed yet, keep it unused
    if (!guessedLetters.some(guess => guess.includes(letter))) {
        return "unused";
    }
  
    // If letter has been guessed but isn't in solution
    if (!upperSolution.includes(letter)) {
        return "gray";
    }
  
    for (const guess of guessedLetters) {
        for (let i = 0; i < guess.length; i++) {
            const currentLetter = guess[i];
            if (currentLetter === letter) {
                if (upperSolution[i] === letter) {
                    return "green";
                }
                if (upperSolution.includes(letter)) {
                    bestColor = "yellow";
                }
            }
        }
    }
  
    return bestColor;
}

  const Keyboard = ({ solutionWord = "HELLO", guesses = [], onKeyPress }) => {
    const keyboardLayout = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
    ];
  
    const [keyboardRows, setKeyboardRows] = useState([]);

    const handleKeyClick = (letter) => {
        // Create a synthetic event similar to keyboard event
        const keyEvent = {
          key: letter,
          preventDefault: () => {}
        };
        onKeyPress(keyEvent);
      };
    
  
    useEffect(() => {
        const rows = keyboardLayout.map((row) =>
            row.map((keyVal) => {
                if (keyVal === "ENTER" || keyVal === "BACKSPACE") {
                    return {
                        letter: keyVal,
                        colorClass: "bg-stone-300",
                    };
                }
    
                const letter = keyVal.toUpperCase();
                const color = getLetterColor(guesses, solutionWord, letter);
    
                let colorClass;
                let textColor;
                switch (color) {
                    case "green":
                        colorClass = "bg-green-600 ";
                        textColor = "text-white";
                        break;
                    case "yellow":
                        colorClass = "bg-yellow-400";
                        textColor = "text-white";
                        break;
                    case "gray":
                        colorClass = "bg-gray-800 ";
                        textColor = "text-white" 
                        break;
                    default:
                        colorClass = "bg-gray-400"; // Default light gray for unused
                }
    
                return {
                    letter,
                    colorClass,
                    textColor,
                };
            })
        );
    
        setKeyboardRows(rows);
    }, [solutionWord, guesses]);
  
    return (
      <div className="flex flex-col items-center mt-4">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-2">
            {row.map((keyObj, colIndex) => {
              const isSpecial =
                keyObj.letter === "ENTER" || keyObj.letter === "BACKSPACE";
  
              let baseClasses = `
                ${keyObj.colorClass}
                ${keyObj.textColor} 
                flex items-center justify-center
                rounded-full
                mx-1
                shadow-[0_4px_0_rgba(0,0,0,0.5)]
                border-4 border-black
                transition-all duration-150
                hover:scale-105
                hover:cursor-pointer
                active:scale-100
                //add white text shadow
                active:shadow-[0_2px_0_rgba(0,0,0,0.5)]
              `.replace(/\s+/g, " ");
  
              let widthClass = isSpecial ? "w-20 h-12" : "w-12 h-12";
  
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${baseClasses} ${widthClass}`}
                  style={{
                    background: isSpecial ? undefined : keyObj.colorClass === "bg-gray-400" ? 
                      "linear-gradient(to bottom, #ccc, #eee)" : undefined,
                    //add a white text
                    textShadow: "1px 1px 1px white"

                  }}
                  onClick={() => handleKeyClick(keyObj.letter)}
                >
                  {keyObj.letter === "BACKSPACE" ? "←" : keyObj.letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  export default Keyboard;