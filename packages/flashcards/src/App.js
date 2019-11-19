import React, { useState } from "react";
import "./App.css";
import x11 from "@colorcodes/x11";
import Game from "./Game";
import GameSplash from "./GameSplash";
import Round from './Round';
import {
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
    header: "X11",
    description: "The full set of X11 colors",
    items: x11
  },

  basic: {
    header: "X11 - Basic Colors",
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

// ACTIVE_GAME

const newGame = () => {
  return {
  
  }
}
function App() {
  const [scoring, updateScoring] = useState({ correct: 0, incorrect: 0 });
  const [questionSet, setQuestionSet] = useState(null);
  const [game, setGame] = useState(null)

  if(game) {
    return (
      <Game
        questionSet={game.questionSet}
        onDone={() => setGame(null)}
      >
        <Game.Round>
          <Game.Statistic />
        </Game.Round>
      </Game>
    );
  }

  return (
    <GameSplash>
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
    </GameSplash>
  );
}

export default App;
