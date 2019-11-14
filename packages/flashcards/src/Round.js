import React, {useState, useReducer} from 'react';
import './App.css';
import x11 from '@colorcodes/x11';
import {sample} from 'lodash';
import Color from 'color';
import {Icon, Label, Input, Container, Segment, Header, Button, Form} from 'semantic-ui-react';
import Question from './Question';

const newGame = {
  score: {
    correct: 0,
    incorrect: 0,
  },
  guesses: []
}

const scoreReducer = (oldState, action) => {
  switch(action.type){
    case 'correct': return {
      ...oldState,
      correct: oldState.correct + 1,
    }

    case 'incorrect': return {
      ...oldState,
      incorrect: oldState.incorrect + 1,
    }
  }
}

const gameReducer = (oldState, action) => {
  return {
    score: scoreReducer(oldState.score, action),
  }
}

export default ({onDone, color, gameState, beginTransition, activeTransition, completeTransition}) => {
  const [state, dispatch] = useReducer(gameReducer, newGame);

  const isDark = Color(color.hex).isDark();
  const fgColor = isDark ? 'white' : 'black';
  const bgColor = !isDark ? 'white' : 'black';

  const submitGuess = (e) => {
    const answer = e.target.value;
    onDone(answer === color.name);
  }

  return (
    <Segment
      placeholder
      textAlign='center'
      vertical
      style={{ background: color.hex, minHeight: '100vh', padding: '1em 0em' }}
    >
      <Container textAlign='center' text>
        <Header as='h1' style={{color: fgColor}}>CSS Color Quiz</Header>
        <Question 
           onAnswer={submitGuess}
           color={color}
           onSubmit={() => {}}
        />
        <h2 style={{color: fgColor}}>Score: {state.score.correct} correct, {state.score.incorrect} incorrect </h2>
      </Container>
    </Segment>
  );
}
