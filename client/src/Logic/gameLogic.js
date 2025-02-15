export const handleType = (event, currentGuess, setCurrentGuess, endGame, solutionWord, guesses, setGuesses) => {
  const key = event.key.toUpperCase();
  
  // Only handle letter keys, backspace and enter
  if (!/^[A-Z]$/.test(key) && key !== 'BACKSPACE' && key !== 'ENTER') {
    return;
  }

  // Handle ENTER key separately
  if (key === 'ENTER') {
    console.log("enter key pressed", currentGuess, solutionWord);
    if (currentGuess.length !== 5) {
      return;
    }
    
    const newGuesses = [...guesses];
    const emptyIndex = guesses.findIndex(g => g === null);
    newGuesses[emptyIndex] = currentGuess;
    setGuesses(newGuesses);
    setCurrentGuess('');

    const isCorrect = currentGuess === solutionWord;
    console.log(" here : ", guesses, currentGuess, solutionWord, isCorrect);
    if (isCorrect) {
      endGame();
    }
    return;
  }

  // Handle other keys
  setCurrentGuess(oldGuess => {
    if (key === 'BACKSPACE') {
      return oldGuess.slice(0, -1);
    }
    // Limit the guess to 5 letters
    if (oldGuess.length >= 5) {
      return oldGuess;
    }
    return oldGuess + key;
  });
};