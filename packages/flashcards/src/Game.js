import React, { useState, useReducer, useContext } from "react";
import "./App.css";
import { shuffle } from "lodash";
import x11 from "@colorcodes/x11";
import { sample } from "lodash";
import Color from "color";
import {
  Message,
  Menu,
  Progress,
  Statistic,
  Icon,
  Label,
  Input,
  Container,
  Segment,
  Header,
  Button,
  Form
} from "semantic-ui-react";
import Round from "./Round";

const GameContext = React.createContext({
});

const Results = ({ children }) => {
  if (React.Children.count(children)) {
    return (
      <Segment>
        <Header as="h1">Results</Header>
        {children}
      </Segment>
    );
  } else {
    return <div />;
  }
};

const Game = ({questionSet, onDone, children}) => {
  const { items, header, description } = questionSet;
  const [rounds, setRounds] = useState(shuffle(items));
  const [roundIndex, setRoundIndex] = useState(0);
  const [results, setResults] = useState([]);

  const onRoundDone = result => {
    setResults(results.concat([result]));
    if (roundIndex < rounds.length) {
      setRoundIndex(roundIndex + 1);
    } else {
      onDone();
    }
  };


  const color = rounds[roundIndex];
  const isDark = Color(color.hex).isDark();
  const fgColor = isDark ? "white" : "black";

  const state = { fgColor, isDark, color, onRoundDone, results, rounds, roundIndex }
  return <GameContext.Provider value={state}>{children}</GameContext.Provider>
};

const GameRound = ({children}) => {
  const gamestate = useContext(GameContext);
  return (
    <Round
      color={gamestate.color}
      onDone={gamestate.onRoundDone}
    >{(roundstate) => (
      <Round.Container>
        <Round.QuestionSegment onRoundDone={gamestate.onRoundDone}>
           <Round.Question />
           <Round.Answer />
           <Game.Progress />
        </Round.QuestionSegment>
        {children}
      </Round.Container>
    )}
    </Round>
  );
}

const GameStatistic = () => {
  const {results} = useContext(GameContext);
  const correct = results.filter(item => item.isCorrect).length;
  const incorrect = results.filter(item => !item.isCorrect).length;

  return(
    <Segment>
      <Statistic horizontal size="mini" color="green">
        <Statistic.Value>{correct}</Statistic.Value>
        <Statistic.Label>correct</Statistic.Label>
      </Statistic>
      <Statistic horizontal size="mini" color="red">
        <Statistic.Value>{incorrect}</Statistic.Value>
        <Statistic.Label>incorrect</Statistic.Label>
      </Statistic>
      {[...results].reverse().map((x, i) => (
        <Round.Result {...x} key={x.state.color.name} />
      ))}
    </Segment>
  )
}

const GameProgress = () => {
  const {roundIndex, rounds} = useContext(GameContext)
  return (
    <Progress
      size="small"
      value={roundIndex + 1}
      total={rounds.length}
      progress="ratio"
    />
  )
}

export default Game;
Game.Progress = GameProgress;
Game.Statistic = GameStatistic;
Game.Round = GameRound;
