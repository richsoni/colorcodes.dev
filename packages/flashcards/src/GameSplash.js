import React from "react";
import {
  Card,
  Container,
  Segment
} from "semantic-ui-react";

const GameSplash = ({ children }) => {
  return (
    <Segment
      placeholder
      textAlign="center"
      vertical
      inverted
      style={{ fontSize: "2rem", minHeight: "100vh" }}
    >
      <Container text>
        {children}
      </Container>
    </Segment>
  );
};

GameSplash.QuestionSet = ({ items, onClick, header, description }) => {
  return (
    <Card onClick={onClick}>
      <div style={{
        display: 'grid',
        height: '100px',
        gridTemplateColumns: `repeat(${Math.ceil(items.length / 5)}, 1fr [col-start])`,

      }}>
        {items.map((c) => {
          return (
            <div key={c.name} style={{backgroundColor: c.name}} />
          )})
        }
      </div>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default GameSplash;
