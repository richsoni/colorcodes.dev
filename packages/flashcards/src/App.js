import React, {useState} from 'react';
import './App.css';
import x11 from '@colorcodes/x11';
import Game from './Game';
import GameSplash from './GameSplash';
import {Sidebar, Menu, Progress, Statistic, Icon, Label, Input, Container, Segment, Header, Button, Form} from 'semantic-ui-react';

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
    return (
      <Segment style={{minHeight: '100vh', borderRadius: '0'}} inverted>
        <Container text textAlign='center'>
          <Segment attached='top' placeholder style={{backgroundColor: 'blue', minHeight: '25vw', color: 'white'}}>
             test
          </Segment>
          <Segment attached>
             <Input fluid size='massive' type='text' />
          </Segment>
          <Button size='huge' color='blue' attached='bottom' style={{maxWidth: '100%'}}>Guess</Button>

          <Segment>
             <Progress />
          </Segment>
        </Container>
      </Segment>
    )
  }
  return (
    <GameSplash onStartClick={() => setGameState(GAME_STATES.RUNNING) } />
  );
}

export default App;
