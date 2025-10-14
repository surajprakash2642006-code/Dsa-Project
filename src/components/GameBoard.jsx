import React, { useEffect, useState, useCallback, useRef } from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import EndGamePanel from './EndGamePanel';

const WIDTH = 28;
// prettier-ignore
const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,
  1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
  1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1,
  1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
  1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1,
  1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1,
  1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,
  0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0,
  1,1,1,1,1,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,1,1,1,1,1,
  0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0,
  1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1,
  1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,
  1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,
  1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1,
  1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1,
  1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1,
  1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,
  1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

const PACMAN_START_POS = 28 * 20 + 14;

const initialGhosts = [
  { id: 'blinky', pos: 28 * 11 + 12 },
  { id: 'pinky', pos: 28 * 11 + 13 },
  { id: 'inky', pos: 28 * 11 + 14 },
];

const getHighScore = () => parseInt(localStorage.getItem('pacmanHighScore') || '0');

function GameBoard() {
  const [grid, setGrid] = useState(layout);
  const [pacmanPos, setPacmanPos] = useState(PACMAN_START_POS);
  const [pacmanDir, setPacmanDir] = useState('up');
  const [ghosts, setGhosts] = useState(initialGhosts);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [dots, setDots] = useState(0);
  const [gameState, setGameState] = useState('ready');
  const [highScore, setHighScore] = useState(getHighScore);

  useEffect(() => {
    setDots(grid.filter(cell => cell === 2 || cell === 3).length);
  }, [grid]);

  const startNewGame = useCallback(() => {
    setGrid(layout);
    setScore(0);
    setLives(3);
    resetCharacterPositions();
    setGameState('ready');
  }, []);

  const resetCharacterPositions = useCallback(() => {
    setPacmanPos(PACMAN_START_POS);
    setGhosts(initialGhosts);
    setGameState('ready');
  }, []);

  const updateGhostPosition = useCallback((id, newPos) => {
    setGhosts(prevGhosts =>
      prevGhosts.map(g => (g.id === id ? { ...g, pos: newPos } : g))
    );
  }, []);

  const handleCatch = useCallback(() => {
    if (gameState !== 'playing') return;
    const newLives = lives - 1;
    setLives(newLives);

    if (newLives > 0) {
      resetCharacterPositions();
    } else {
      setGameState('lost');
    }
  }, [gameState, lives, resetCharacterPositions]);

  useEffect(() => {
    if (dots === 0 && gameState === 'playing') {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('pacmanHighScore', score.toString());
      }
      setGameState('won');
    }
  }, [dots, score, highScore, gameState]);

  useEffect(() => {
    const movePacman = (e) => {
      if (gameState === 'ready') {
        setGameState('playing');
      }
      if (gameState !== 'playing') return;

      const dirMap = {
        ArrowUp: { delta: -WIDTH, dir: 'up' },
        ArrowDown: { delta: WIDTH, dir: 'down' },
        ArrowLeft: { delta: -1, dir: 'left' },
        ArrowRight: { delta: 1, dir: 'right' },
      };
      const move = dirMap[e.key];
      if (!move) return;

      setPacmanPos(prevPos => {
        let newPos = prevPos + move.delta;
        if (newPos === 28 * 14) newPos = 28 * 14 + 27;
        else if (newPos === 28 * 14 + 27) newPos = 28 * 14;

        if (grid[newPos] !== 1) {
          setPacmanDir(move.dir);
          const cellValue = grid[newPos];
          if (cellValue === 2 || cellValue === 3) {
            const newGrid = [...grid];
            newGrid[newPos] = 0;
            setGrid(newGrid);
            setScore(s => s + (cellValue === 2 ? 10 : 50));
          }
          return newPos;
        }
        return prevPos;
      });
    };

    window.addEventListener('keydown', movePacman);
    return () => window.removeEventListener('keydown', movePacman);
  }, [gameState, grid]);

  return (
    <div className="game-container">
      {(gameState === 'won' || gameState === 'lost') && (
        <EndGamePanel status={gameState} score={score} highScore={highScore} onReplay={startNewGame} />
      )}
      <div className="hud">
        <div>Score: {score}</div>
        <button
          onClick={() => {
            if (gameState === 'playing') setGameState('paused');
            if (gameState === 'paused') setGameState('playing');
          }}
          disabled={gameState !== 'playing' && gameState !== 'paused'}
        >
          {gameState === 'paused' ? 'Resume' : 'Pause'}
        </button>
        <div>Lives: {lives}</div>
      </div>
      <div className="board">
        {grid.map((cell, idx) => {
          const row = Math.floor(idx / WIDTH) + 1;
          const col = (idx % WIDTH) + 1;
          let cls = 'cell';
          if (cell === 1) cls += ' wall';
          else if (cell === 2) cls += ' dot';
          else if (cell === 3) cls += ' pellet';
          return <div key={idx} className={cls} style={{ gridRow: row, gridColumn: col }} />;
        })}
        <Pacman pos={pacmanPos} direction={pacmanDir} />
        {ghosts.map((ghost) => (
          <Ghost
            key={ghost.id}
            id={ghost.id}
            gameState={gameState}
            grid={grid}
            pacmanPos={pacmanPos}
            ghostPos={ghost.pos}
            setGhostPos={(newPos) => updateGhostPosition(ghost.id, newPos)}
            width={WIDTH}
            onCatch={handleCatch}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;