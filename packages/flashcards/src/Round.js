import React, { useState, useReducer, useContext } from "react";
import "./App.css";
import x11 from "@colorcodes/x11";
import { sample } from "lodash";
import Color from "color";
import {
  Message,
  Icon,
  Label,
  Input,
  Container,
  Segment,
  Header,
  Button,
  Form
} from "semantic-ui-react";
import Answer from "./Answer";
import { LogoSegment } from "./Logo";

const RoundContext = React.createContext({
  color: Color("white"),
  fgColor: "black",
  onAnswer: () => {}
});

const Round = ({ color, children, onDone }) => {
  const fgColor = Color(color.hex).isDark() ? "white" : "black";

  const onAnswer = answer => {
    onDone({
      isCorrect: answer.replace("grey", "gray") === color.name,
      state: { fgColor, color, answer }
    });
  };
  const state = { fgColor, onAnswer, color };
  const childs = children(state)
  return <RoundContext.Provider value={state}>{childs}</RoundContext.Provider>
};

const RoundContainer = ({ children }) => {
  const {color} = useContext(RoundContext)
  return (
    <Segment
      style={{
        borderRadius: 0,
        background: color.hex,
        minHeight: "100vh",
        padding: "3em 0em"
      }}
    >
      <Container textAlign="center" text>
        {children}
      </Container>
    </Segment>
  );
};

const RoundAnswer = () => {
  const { color, onAnswer, fgColor } = useContext(RoundContext);
  return <Answer onAnswer={onAnswer} color={color} />;
};

Round.Result = ({ isCorrect, state }) => {
  const { fgColor, color, answer } = state;
  return (
    <Segment style={{
        backgroundColor: color.hex,
        color: fgColor
      }}
      raised
    >
      <Label color={isCorrect ? "green" : "red"} attached="top left">
        <Icon name={isCorrect ? "check" : "x"} />
        {answer}
      </Label>
      {color.name}
    </Segment>
  );
};

const RoundQuestion = () => {
  const {color, fgColor} = useContext(RoundContext);
  return ( <LogoSegment backgroundColor={color.hex} color={fgColor} />);
}

const RoundQuestionSegment = ({children, onRoundDone}) => {
  const {fgColor, color} = useContext(RoundContext);
  return (
    <Segment attached>
      <Message
        icon="question"
        header="Given The Following Card"
        content="Guess It's X11 Color"
      />
      {children}
    </Segment>
  );
}


Round.Container = RoundContainer;
Round.Answer = RoundAnswer;
Round.Question = RoundQuestion;
Round.QuestionSegment = RoundQuestionSegment;
export default Round;
