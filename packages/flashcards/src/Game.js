import React, {useState, useReducer} from 'react';
import './App.css';
import {shuffle} from 'lodash';
import x11 from '@colorcodes/x11';
import {sample} from 'lodash';
import Color from 'color';
import {Icon, Label, Input, Container, Segment, Header, Button, Form} from 'semantic-ui-react';
import Question from './Question';
import Round from './Round';

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

export default ({inputColors, onDone}) => {
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [rounds, setRounds] = useState(shuffle(inputColors))
  const [roundIndex, setRoundIndex] = useState(0)

  const onRoundDone = (corret) => {
    if(correct){ setCorrect(correct+1) }
    else { setIncorrect(incorrect+1) }
    if(roundIndex < rounds.length){
      setRoundIndex(roundIndex+1)
    } else {
      onDone()
    }
  }

  const color = rounds[roundIndex];
  return (<Round color={color} onDone={onRoundDone} />);
}
