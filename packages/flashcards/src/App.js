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

const questionSets = {
  x11: {
    header: 'X11',
    description: 'The full set of X11 colors',
    items: x11,
  },

  basic: {
    header: 'X11 - Basic Colors',
    description: 'Listed on https://www.w3.org/TR/css-color-3/ as the basic set of colors',
    items: x11.filter((c) => [
      'black',
      'silver',
      'gray',
      'white',
      'maroon',
      'red',
      'purple',
      'fuchsia',
      'green',
      'lime',
      'olive',
      'yellow',
      'navy',
      'blue',
      'teal',
      'aqua',
    ].includes(c.name)),
  }
}

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.READY)
  const [scoring, updateScoring] = useState({correct: 0, incorrect: 0})
  const [questionSet, setQuestionSet] = useState(null)
  if(gameState === GAME_STATES.RUNNING){
    return <Game
      questionSet={questionSet}
      onDone={() => setGameState(GAME_STATES.DONE)}
    />
  }
  if(gameState === GAME_STATES.DONE){
    return (
      <Segment style={{minHeight: '100vh', borderRadius: '0'}} inverted>
        done
      </Segment>
    )
  }
  //otherwise its READY (for now)
  return (
    <GameSplash>
      {
        Object.keys(questionSets).map((key) =>  {
          const qs = questionSets[key];
          return <GameSplash.QuestionSet {...qs} key={key} onClick={() => {
            setQuestionSet(qs)
            setGameState(GAME_STATES.RUNNING)
          }} />
        })
      }
    </GameSplash>
  );
}

export default App;
