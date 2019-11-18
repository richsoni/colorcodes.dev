import React from "react";
import {
  Card,
  Icon,
  Container,
  Button,
  Header,
  Segment
} from "semantic-ui-react";
import { LogoSegment } from "./Logo";

const GameSplash = ({ children, onStartGame = () => {} }) => {
  return (
    <Segment
      placeholder
      textAlign="center"
      vertical
      inverted
      style={{ fontSize: "2rem", minHeight: "100vh" }}
    >
      <Container text>
        <LogoSegment />
        <Segment>
          <Header as="h1" size="large">
            Test Your Knowledge
          </Header>
          <Button onClick={onStartGame} primary size="huge">
            Start
            <Icon name="right arrow" />
          </Button>
        </Segment>
        <Card.Group>{children}</Card.Group>
      </Container>
    </Segment>
  );
};

GameSplash.QuestionSet = ({ onClick, header, description }) => {
  return (
    <Card onClick={onClick}>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default GameSplash;
