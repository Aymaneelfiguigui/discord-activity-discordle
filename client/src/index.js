import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { insertCoin } from "playroomkit";
import { GameStateProvider } from "./hooks/UseGameState";

const root = ReactDOM.createRoot(document.getElementById("root"));

async function startGame() {
  try {
    await insertCoin({
      skipLobby: true, // Set to false to use PlayroomKit's lobby system
    });

    root.render(
      <React.StrictMode>
        <GameStateProvider>
          <App />
        </GameStateProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to initialize PlayroomKit:", error);
  }
}

startGame();

reportWebVitals();
