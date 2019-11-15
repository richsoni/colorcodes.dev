import React, {useState, useReducer, useContext} from 'react';
import './App.css';
import x11 from '@colorcodes/x11';
import {sample} from 'lodash';
import Color from 'color';
import {Message, Icon, Label, Input, Container, Segment, Header, Button, Form} from 'semantic-ui-react';
import Question from './Question';

const RoundContext = React.createContext({
  color: Color('white'),
  fgColor: 'black',
  onAnswer: () => {},
});


const Round = ({color, children, onDone}) => {
  const fgColor = Color(color.hex).isDark() ? 'white' : 'black';

  const onAnswer = (answer) => {
    onDone({
      isCorrect: answer === color.name,
      state: {fgColor, color, answer},
    });
  }
  const state = {fgColor, onAnswer, color}

  return (
    <RoundContext.Provider value={state}>
     {children}
   </RoundContext.Provider>
  );
}


const RoundContainer = ({children}) => {
  const {color, onAnswer, fgColor} = useContext(RoundContext);

  return (
    <Segment
      inverted
      style={{ background: color.hex, minHeight: '100vh', padding: '3em 0em' }}
    >
    <Container textAlign='center' text>
      {children}
    </Container>
    </Segment>
  );
}

const RoundQuestion = () => {
  const {color, onAnswer, fgColor} = useContext(RoundContext);
  return (
    <Question
     onAnswer={onAnswer}
     color={color}
    />
  );
}

Round.Result = ({isCorrect, state}) => {
  const {fgColor, color, answer} = state;
  return <Segment style={{
      backgroundColor: color.hex,
      color: fgColor
    }}
  raised
  >
    <Label color={isCorrect ? 'green' : 'red'} attached='top left' >
      <Icon name={isCorrect ? 'check' : 'x'} />
      {answer}
    </Label>
    {color.name}
  </Segment>
}

Round.Container = RoundContainer;
Round.Question = RoundQuestion;
export default Round;
