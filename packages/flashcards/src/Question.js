import React, {useState, useReducer} from 'react';
import './App.css';
import x11 from '@colorcodes/x11';
import {sample} from 'lodash';
import Color from 'color';
import {Icon, Label, Input, Container, Segment, Header, Button, Form} from 'semantic-ui-react';

export default ({onSubmit, color, onAnswer}) => {
  const [guess, setGuess] = useState('');
  const [complete, setComplete] = useState(false);

  if(!complete) {
    const submitAnswer = () => {
      onAnswer(guess)
      setGuess('')
    }

    const isDark = Color(color.hex).isDark();
    const fgColor = isDark ? 'white' : 'black';
    const bgColor = !isDark ? 'white' : 'black';

    return (
          <Form onSubmit={submitAnswer}>
             <Segment style={{paddingTop: '2rem'}}>
                <Label style={{fontSize: '1rem'}} attached='top left' >background-color:</Label>
                <Input
                   fluid
                   type='text'
                   autoFocus
                   value={guess}
                   onChange={(e) => setGuess(e.target.value)}
                   labelPosition='left'
                   actionPosition='right'
                   style={{
                     fontSize: '2.5rem',
                     color: fgColor,
                     borderColor: fgColor,
                   }}>
                     <Label style={{fontSize: '2.5rem', backgroundColor: color.hex, color: fgColor}}>?</Label>
                     <input />
                  <Button
                    style={{backgroundColor: color.hex, color: fgColor}}
                    size='massive'
                     type='submit'
                  >Guess</Button>
                  </Input>
                  <br />
              </Segment>
          </Form>
    );
  }
}
