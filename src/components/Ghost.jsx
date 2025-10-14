import React, { useEffect, useRef } from 'react';
import { bfs } from '../dsa/bfs';

const WIDTH = 28;
const CELL_SIZE = 20;

export default function Ghost({ id, gameState, grid, pacmanPos, ghostPos, setGhostPos, onCatch, width }) { 
  const movementLogicRef = useRef();

  useEffect(() => {
    movementLogicRef.current = () => {
      if (pacmanPos === null || ghostPos === null) return;
      const path = bfs(ghostPos, pacmanPos, grid, width);
      if (path && path.length > 1) {
        const nextPos = path[1];
        setGhostPos(nextPos);
        if (nextPos === pacmanPos) {
          onCatch();
        }
      }
    };
  });

  useEffect(() => {
    // Ghosts only move if the gameState is 'playing'
    if (gameState !== 'playing') {
      return;
    }

    const interval = setInterval(() => {
      movementLogicRef.current();
    }, 300);
    
    return () => clearInterval(interval);
  }, [gameState]); // The timer now depends only on gameState

  if (ghostPos === null) return null;

  const row = Math.floor(ghostPos / WIDTH);
  const col = ghostPos % WIDTH;
  
  const style = {
    top: `${row * CELL_SIZE}px`,
    left: `${col * CELL_SIZE}px`,
  };

  return <div className={`ghost ghost-${id}`} style={style}></div>;
}