import { isHost, onPlayerJoin, useMultiplayerState } from "playroomkit";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const GameStateContext = createContext();

const NEXT_STAGE = {
    lobby : "game",
    game : "winner",
    winner : "lobby"
}

const TIMER_STAGE = {
    lobby : -1,
    game : 5*60,
    winner : 5
}

export const GameStateProvider = ({ children }) => {
    const [stage, setStage] = useMultiplayerState("gameStage", "lobby");
    const [timer, setTimer] = useMultiplayerState("gameTimer", TIMER_STAGE.lobby);
    const [players, setPlayers] = useState([]);
    const [isSoloGame, setIsSoloGame] = useState(false);
    const host = isHost();
    const isInit = useRef(false);
    useEffect(() => {
        if(isInit.current) {
            return;
        }
        isInit.current = true;
        onPlayerJoin((player) => {
            setPlayers((players) => [...players, player]);
            player.onQuit(() => {
                setPlayers((players) => players.filter((p) => p.id !== player.id))
        });
    });
    }, []);

    useEffect(() => {
        if(!host) {
            return;
        }
        if (stage === "lobby") return;
        const timeout = setTimeout(() => {
            let newTime = stage === "game" ? timer + 1 : timer - 1;
            if (newTime === 0 ){
                const nextStage = NEXT_STAGE[stage];
                setStage(nextStage, true);
                newTime = TIMER_STAGE[nextStage];
            }
            setTimer(newTime, true);
        }, 1000);
        return () => clearTimeout(timeout);


    }, [host, stage, timer, isSoloGame])

  const startGame = () => {
    setStage("game");
    setTimer(TIMER_STAGE.game);
    setIsSoloGame(players.length === 1);
  };

    return (
        <GameStateContext.Provider value={{stage, timer, players, host, isSoloGame, startGame}}>
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


