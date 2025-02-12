import logo from './logo.svg';
import './App.css';
import Lobby from './components/Lobby';
import { GameStateProvider } from './hooks/UseGameState';

function App() {
  return (
    <GameStateProvider>
<Lobby />
    </GameStateProvider>
  );
}

export default App;
