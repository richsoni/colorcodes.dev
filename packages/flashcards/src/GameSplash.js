import React from 'react';
import { Icon, Container, Button, Header, Segment } from 'semantic-ui-react'
import {LogoSegment} from './Logo';

export default ({onStartClick = () => {}}) => {
  return (
    <Segment
      placeholder
      textAlign='center'
      vertical
      inverted
      style={{fontSize: '2rem', minHeight: '100vh' }}
    >
      <Container text>
        <LogoSegment />
        <Segment>
          <Header as='h1' size='big'>Test Your Knowledge</Header>
          <Button onClick={onStartClick} primary size='huge'>
            Start
            <Icon name='right arrow' />
          </Button>
        </Segment>
      </Container>
    </Segment>
  );
};
