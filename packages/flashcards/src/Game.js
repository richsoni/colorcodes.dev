import React, { useState, useReducer } from "react";
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
import Question from "./Question";
import Round from "./Round";
import { LogoSegment } from "./Logo";

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
export default ({ questionSet, onDone }) => {
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

  const correct = results.filter(item => item.isCorrect).length;
  const incorrect = results.filter(item => !item.isCorrect).length;

  const color = rounds[roundIndex];
  const isDark = Color(color.hex).isDark();
  const fgColor = isDark ? "white" : "black";
  return (
    <Round color={color} onDone={onRoundDone}>
      <Round.Container>
        <Segment attached>
          <Message
            icon="question"
            header="Given The Following Card"
            content="Guess It's X11 Color"
          />
          <LogoSegment backgroundColor={color.hex} color={fgColor} />
          <Round.Question />
          <Progress
            inverted={isDark}
            size="small"
            value={roundIndex + 1}
            total={rounds.length}
            progress="ratio"
          />
        </Segment>
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
      </Round.Container>
    </Round>
  );
};
