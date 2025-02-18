// Create a pool of audio objects for better performance
const createAudioPool = (size) => {
  const pool = [];
  for (let i = 0; i < size; i++) {
    pool.push(new Audio("/sounds/KeyDownSoundEffect.mp3"));
  }
  return pool;
};

const audioPool = createAudioPool(3); // Create 3 audio objects
let currentAudioIndex = 0;

const playTypeSound = () => {
  const audio = audioPool[currentAudioIndex];
  audio.currentTime = 0;
  audio.play().catch(() => console.error("Failed to play audio"));
  currentAudioIndex = (currentAudioIndex + 1) % audioPool.length;
};

export const handleType = (
  event,
  currentGuess,
  setCurrentGuess,
  endGame,
  solutionWord,
  
  guesses,
  player
) => {
  const key = event.key.toUpperCase();
  const emptyIndex = guesses.findIndex((g) => g === null);

  // If no more empty guesses available, don't process any keys
  if (emptyIndex === -1) return;

  // Only handle letter keys, backspace and enter
  if (!/^[A-Z]$/.test(key) && key !== "BACKSPACE" && key !== "ENTER") {
    return;
  }

  // Handle ENTER key separately
  if (key === "ENTER") {
    if (currentGuess.length === 5) {
      console.log("here")
      console.log("player here", player)
      playTypeSound(); // Play sound only on valid enter
      const newGuesses = [...guesses];
      newGuesses[emptyIndex] = currentGuess;
      player.setState('guesses',newGuesses);
      setCurrentGuess("");

      const isCorrect = currentGuess === solutionWord;
      console.log(" correct ", isCorrect  )
      if (isCorrect && player) {
        console.log("here in if")
        const didIWin = endGame(player.id);
        player.setState('guesses',Array(6).fill(null));

        if (didIWin) {
          // Only reset guesses after confirming win
          console.log("im here winner : ", player.id)

        }
      }
    }
    return;
  }

  // Handle other keys
  setCurrentGuess((oldGuess) => {
    if (key === "BACKSPACE") {
      if (oldGuess.length > 0) {
        playTypeSound(); // Play sound only when actually deleting
        return oldGuess.slice(0, -1);
      }
      return oldGuess;
    }

    // Only play sound and add letter if within limits
    if (oldGuess.length < 5) {
      playTypeSound();
      return oldGuess + key;
    }
    return oldGuess;
  });
};

