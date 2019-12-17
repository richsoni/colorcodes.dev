import React from "react";
import {
  Icon,
  Header,
  Segment
} from "semantic-ui-react";

export const LogoSegment = ({ color, backgroundColor }) => {
  return (
    <Segment style={{ color, backgroundColor }}>
      <Header as="h1" size="huge" icon style={{ color, backgroundColor }}>
        <Icon name="paint brush" />
        colorcodes.dev
        <Header.Subheader>x11 flashcards</Header.Subheader>
      </Header>
    </Segment>
  );
};
