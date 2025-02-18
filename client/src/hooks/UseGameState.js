import { isHost, onPlayerJoin, useMultiplayerState, usePlayersList } from "playroomkit";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import wordsList from '../data/RandomWords.json';


const GameStateContext = createContext();

const NEXT_STAGE = {
    lobby : "game",
    game : "winner",
    winner : "lobby"
}

const TIMER_STAGE = {
    lobby : -1,
    game : 10,
    winner : 7
}

export const GameStateProvider = ({ children }) => {
    const [stage, setStage] = useMultiplayerState("gameStage", "lobby");
    const [timer, setTimer] = useMultiplayerState("gameTimer", TIMER_STAGE.lobby);
    //const [winner, setWinner] = useState(null)
    const [isGameOver, setIsGameOver] = useState(false);
    const players = usePlayersList(true)
    const [isSoloGame, setIsSoloGame] = useState(false);
    const currentPlayer = players.find((player) => player.id === player.myId);
    const host = isHost();
    const isInit = useRef(false);
    useEffect(() => {
        if(isInit.current) {
            return;
        }
        isInit.current = true;

    // onPlayerJoin((player) => {
    //   setPlayers((players) => [...players, player]);
    //   player.onQuit(() => {
    //     setPlayers((players) => players.filter(p => p.id !== player.id));
    //   });
    // });
    }, []);

    useEffect(() => {
        if(!host) {
            return;
        }
        if (stage === "lobby") return;
        const timeout = setTimeout(() => {
            let newTime = stage === "game" ? timer - 1 : timer - 1;
            if (newTime === 0 ){
                const nextStage = NEXT_STAGE[stage];
                setStage(nextStage, true);
                newTime = TIMER_STAGE[nextStage];
            }
            setTimer(newTime, true);
        }, 1000);
        return () => clearTimeout(timeout);


    }, [host, stage, timer, isSoloGame])
    const startGame = async (setSolutionWord, setCurrentGuess) => {
      try {
        // Validate words array
        if (!Array.isArray(wordsList) || wordsList.length === 0) {
          throw new Error('Invalid words data');
        }

        const newSolution = wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
    
        // Reset game state
        setStage("game");
        setTimer(TIMER_STAGE.game);
        setIsSoloGame(players.length === 1);
        setSolutionWord(newSolution);
        //setGuesses(Array(6).fill(null));
        setCurrentGuess('');
        //setWinner(null);
        setIsGameOver(false); // Add this line to reset the game over state

        // setPlayers(prevPlayers => prevPlayers.map(player => ({
        //   ...player,
        //   isWinner: false
        // })));
        players.forEach(player => {
          player.setState('isWinner', false);
          player.setState('guesses', Array(6).fill(null));

        });
    
      } catch (error) {
        console.error('Error loading words:', error);
        setSolutionWord('WORDS');
      }
    };


  const endGame = (winnerId) => {
    // if (isGameOver) {
    //   console.log("maybe here")
    //   return; // Return false if game is already over
    // }
    
    const currentPlayer = players.find((player) => player.id === player.myId)
    if (!currentPlayer) return false;

    
    setIsGameOver(true);
    setStage("winner");
    setTimer(TIMER_STAGE.winner);
  
    // setPlayers((prevPlayers) =>
    //   prevPlayers.map((player) => ({
    //     ...player,
    //     isWinner: player.id === winnerId
    //   }))
    // );
    players.forEach(player => {
      player.setState('isWinner', player.id === winnerId);
    });
    console.log("maybe here actually ", players )


    
  
    return currentPlayer.id === winnerId;
  };

    return (
        <GameStateContext.Provider value={{stage, timer, players, host, isSoloGame, startGame, endGame, currentPlayer, TIMER_STAGE}}>
        {children}
        </GameStateContext.Provider>
    );
}

export const useGameState = () => {
    const context = useContext(GameStateContext);
    if(!context) {
        throw new Error("UseGameState must be used within a GameStateProvider");
    }
    return context;
}


