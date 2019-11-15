import React from 'react';
import { Icon, Container, Button, Header, Segment } from 'semantic-ui-react'

export const LogoSegment = () => {
  return (<Segment>
    <Header
      as='h1'
      size='huge'
      icon
    >
       <Icon name='paint brush' />
       colorcodes.dev
       <Header.Subheader>x11 flashcards</Header.Subheader>
    </Header>
  </Segment>)
}

