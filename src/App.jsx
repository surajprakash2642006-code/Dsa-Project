import GameBoard from './components/GameBoard';
import './App.css'; // General app styles if you have them

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#ffd700', fontFamily: "'Press Start 2P', cursive" }}>
        Pac-Man with DSA 👻
      </h1>
      <GameBoard />
    </div>
  );
}

export default App;
