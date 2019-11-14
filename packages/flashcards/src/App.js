import React, {useState} from 'react';
import './App.css';
import x11 from '@colorcodes/x11';
import Game from './Game';
import GameSplash from './GameSplash';

const GAME_STATES = {
  READY: 'READY',
  RUNNING: 'RUNNING',
  DONE: 'DONE',
}

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.READY)
  const [scoring, updateScoring] = useState({correct: 0, incorrect: 0})
  if(gameState === GAME_STATES.RUNNING){
    return <Game
      inputColors={x11}
      onDone={() => setGameState(GAME_STATES.DONE)}
    />
  }
  if(gameState === GAME_STATES.DONE){
    return <div>DONE</div>
  }
  return (
    <GameSplash onStartClick={() => setGameState(GAME_STATES.RUNNING) } />
  );
}

export default App;
