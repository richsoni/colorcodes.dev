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

const Game = ({questionSet, onDone, children}) => {
  const { items, header } = questionSet;
  const [rounds, setRounds] = useState(shuffle(items));
  const [roundIndex, setRoundIndex] = useState(0);
  const [results, setResults] = useState([]);

  const onRoundDone = result => {
    const newResults = results.concat([result]);
    setResults(newResults)
    if (roundIndex <= rounds.length - 2) {
      setRoundIndex(roundIndex + 1);
    } else {
      setRoundIndex(roundIndex + 1);
      onDone({results: newResults});
    }
  };

  const color = rounds[roundIndex];
  const isDark = Color(color.hex).isDark();
  const fgColor = isDark ? "white" : "black";

  const state = { fgColor, isDark, color, onRoundDone, results, rounds, roundIndex }
  return <GameContext.Provider value={state}>{children(state)}</GameContext.Provider>
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
Game.Round = GameRound;
