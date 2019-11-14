import React, {useState, useReducer} from 'react';
import './App.css';
import x11 from '@colorcodes/x11';
import {sample} from 'lodash';
import Color from 'color';

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

export default ({inputColors, gameState, beginTransition, activeTransition, completeTransition}) => {
  const [color, setColor] = useState(sample(x11));
  const [guess, setGuess] = useState('');

  const [state, dispatch] = useReducer(gameReducer, newGame);

  const fgColor = Color(color.hex).isDark() ? 'white' : 'black'

  const endRound = (e) => {
    e.preventDefault();
    if(e.target.value === color.name){
      dispatch({type: 'correct'})
    } else {
      dispatch({type: 'incorrect'})
    }
    setGuess('')
    setColor(sample(x11))
  }

  return (
    <div className="round" style={{
      background: color.hex,
    }}>
      <form onSubmit={endRound}>
        <h1 style={{color: fgColor}}>CSS Color Quiz!</h1>
        <h2 style={{color: fgColor}}>Guess the background by CSS Color name</h2>
        <input
           type='text'
           autoFocus
           value={guess}
           onChange={(e) => setGuess(e.target.value)}
           style={{
             color: fgColor,
             borderColor: fgColor,
           }} />
        <input
           type='submit'
           value='Submit Guess'
           style={{
             background: fgColor,
             color: color.hex,
           }}
        />
        <h2 style={{color: fgColor}}>Score: {state.score.correct} correct, {state.score.incorrect} incorrect </h2>
      </form>
    </div>
  );
}
