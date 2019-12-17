import React, { useState } from "react";
import "./App.css";
import {chain, upperFirst} from "lodash";
import colors from "@colorcodes/colors";
import Game from "./Game";
import GameSplash from "./GameSplash";
import Stats from './Stats';
import {LogoSegment} from './Logo';
import {
  Card,
  Container,
  Header} from "semantic-ui-react";


const questionSets = chain(Object.values(colors))
  .map((c) => c.tags)
  .flatten()
  .uniq()
  .map((tag) => {
    const items = Object.values(colors).filter((c) => c.tags.includes(tag))
    return {
      items,
      header: `${upperFirst(tag)} Family`,
      description: `${items.length} colorcodes in the ${tag} family`,
    }
  })
  .value()

function App() {
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
        <Container text padded="true">
          <Card.Group centered>
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
        </Container>
      </GameSplash>
    </Container>
  );
}

export default App;
