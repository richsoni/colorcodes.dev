import React, { useState } from "react";
import "./App.css";
import x11 from "@colorcodes/x11";
import Game from "./Game";
import GameSplash from "./GameSplash";
import Round from './Round';
import Stats from './Stats';
import {LogoSegment} from './Logo';
import {
  Card,
  Sidebar,
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

const questionSets = {
  x11: {
    header: "Full CSS Colorset",
    description: "Based on the X11 Colors https://www.youtube.com/watch?v=d-OrHsG-03I",
    items: x11
  },

  blackwhite: {
    header: "Black & White",
    description:
      "Listed on https://www.w3.org/TR/css-color-3/ as the basic set of colors",
    items: x11.filter(c =>
      [
        "black",
        "white",
      ].includes(c.name)
    )
  },

  basic: {
    header: "Basic CSS Colors",
    description:
      "Listed on https://www.w3.org/TR/css-color-3/ as the basic set of colors",
    items: x11.filter(c =>
      [
        "black",
        "silver",
        "gray",
        "white",
        "maroon",
        "red",
        "purple",
        "fuchsia",
        "green",
        "lime",
        "olive",
        "yellow",
        "navy",
        "blue",
        "teal",
        "aqua"
      ].includes(c.name)
    )
  }
};

function App() {
  const [scoring, updateScoring] = useState({ correct: 0, incorrect: 0 });
  const [questionSet, setQuestionSet] = useState(null);
  const [game, setGame] = useState(null)
  const [summary, setSummary] = useState(null)

  if(game) {
    return (
      <Game
        questionSet={game.questionSet}
        onDone={({results}) => {
          setGame(null)
          setSummary({results})
        }}
      >{(gamestate) => (
          <Game.Round>
            <Stats results={gamestate.results} />
          </Game.Round>
        )}
      </Game>
    );
  }

  return (
    <Container fluid>
      <GameSplash>
        {summary && <Header as='h1' style={{color: 'white', fontSize: '3em'}}>Game Summary</Header>}
        {summary && <Stats results={summary.results} />}
        {summary && <Header as='h1' style={{color: 'white', fontSize: '3em'}}>Play Again</Header>}
        <LogoSegment />
        <Card.Group>
          {Object.keys(questionSets).map(key => {
            const questionSet = questionSets[key];
            return (
              <GameSplash.QuestionSet
                {...questionSet}
                key={key}
                onClick={() => {
                  setGame({questionSet});
                }}
              />
            );
          })}
        </Card.Group>
      </GameSplash>
    </Container>
  );
}

export default App;
