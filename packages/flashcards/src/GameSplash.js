import React from 'react';
import { Icon, Container, Button, Header, Segment } from 'semantic-ui-react'

export default ({onStartClick = () => {}}) => {
  return (
    <Segment
      inverted
      textAlign='center'
      style={{ minHeight: '100vh', padding: '1em 0em' }}
    >
      <Container textAlign='center' text>
        <Header
          as='h1'
          content='CSS Color Quiz!'
          inverted
          style={{
            marginTop: '25vh',
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
          }}
        />
        <Header
          as='h2'
          content='Guess the background by CSS Color name'
          inverted
          style={{
            fontWeight: 'normal',
          }}
        />
        <Button onClick={onStartClick} primary size='huge'>
          Get Started
          <Icon name='right arrow' />
        </Button>
      </Container>
    </Segment>
  );
};
