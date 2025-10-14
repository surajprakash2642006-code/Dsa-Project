import React from 'react';

const WIDTH = 28;
const CELL_SIZE = 20; // Each cell is 20px wide and high

export default function Pacman({ pos, direction }) {
  // Calculate position in pixels using 0-based indexing
  const row = Math.floor(pos / WIDTH);
  const col = pos % WIDTH;

  const style = {
    top: `${row * CELL_SIZE}px`,
    left: `${col * CELL_SIZE}px`,
  };

  return (
    <div className={`pacman pacman-${direction}`} style={style}></div>
  );
}