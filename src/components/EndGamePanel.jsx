import React from 'react';

// This is a simple styling object for the panel
const panelStyles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#ffd700',
    zIndex: 100,
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  scores: {
    fontSize: '1.5rem',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    backgroundColor: '#222',
    color: '#ffd700',
    border: '2px solid navy',
    fontFamily: "'Press Start 2P', cursive",
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
  }
};

export default function EndGamePanel({ status, score, highScore, onReplay }) {
  const title = status === 'won' ? 'You Win!' : 'Game Over';

  return (
    <div style={panelStyles.container}>
      <h2 style={panelStyles.title}>{title}</h2>
      <div style={panelStyles.scores}>
        <p>Your Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>
      <div style={panelStyles.buttonContainer}>
        <button style={panelStyles.button} onClick={onReplay}>Replay</button>
        <button style={panelStyles.button} onClick={() => window.location.reload()}>Exit</button>
      </div>
    </div>
  );
}