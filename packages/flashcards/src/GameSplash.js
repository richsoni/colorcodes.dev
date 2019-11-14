import React from 'react';
import { Icon, Container, Button, Header, Segment } from 'semantic-ui-react'

export default ({onStartClick = () => {}}) => {
  return (
    <Segment
      placeholder
      textAlign='center'
      vertical
      inverted
      style={{fontSize: '2rem', minHeight: '100vh' }}
    >
        <Header
          as='h1'
          size='huge'
          inverted
          icon
        >
           <Icon name='paint brush' />
           CSS Color Quiz
          <Header.Subheader as='h2'>
            Guess the background by CSS Color name
          </Header.Subheader>
        </Header>
        <Button onClick={onStartClick} primary size='huge'>
          Get Started
          <Icon name='right arrow' />
        </Button>
    </Segment>
  );
};
