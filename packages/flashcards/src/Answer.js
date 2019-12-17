import React, { useState } from "react";
import "./App.css";
import Color from "color";
import {
  Label,
  Input,
  Segment,
  Button,
  Form
} from "semantic-ui-react";

export default ({ color, onAnswer }) => {
  const [guess, setGuess] = useState("");
  const [complete] = useState(false);

  if (!complete) {
    const submitAnswer = () => {
      onAnswer(guess);
      setGuess("");
    };

    const isDark = Color(color.hex).isDark();
    const fgColor = isDark ? "white" : "black";

    return (
      <Form onSubmit={submitAnswer}>
        <Segment>
          <Input
            fluid
            type="text"
            size="large"
            autoFocus
            value={guess}
            onChange={e => setGuess(e.target.value)}
            label={
              <Label
                style={{ color: fgColor, borderColor: color.hex }}
                icon="paint brush"
              />
            }
            labelPosition="left corner"
          />
          <br />
          <Button
            size="large"
            type="submit"
            icon
            style={{
              backgroundColor: color.hex,
              color: fgColor,
              border: `1px solid ${fgColor}`
            }}
          >
            Guess
          </Button>
        </Segment>
      </Form>
    );
  }
};
