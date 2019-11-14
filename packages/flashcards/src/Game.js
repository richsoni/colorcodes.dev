import React, {useState, useReducer} from 'react';
import './App.css';
import {shuffle} from 'lodash';
import x11 from '@colorcodes/x11';
import {sample} from 'lodash';
import Color from 'color';
import {Progress, Statistic, Icon, Label, Input, Container, Segment, Header, Button, Form} from 'semantic-ui-react';
import Question from './Question';
import Round from './Round';

export default ({inputColors, onDone}) => {
  const [rounds, setRounds] = useState(shuffle(inputColors))
  const [roundIndex, setRoundIndex] = useState(0)
  const [results, setResults] = useState([])

  const onRoundDone = (result) => {
    setResults(results.concat([result]))
    if(roundIndex < rounds.length){
      setRoundIndex(roundIndex+1)
    } else {
      onDone()
    }
  }

  const correct = results.filter((item) => item.isCorrect).length
  const incorrect = results.filter((item) => !item.isCorrect).length

  const color = rounds[roundIndex];
  const fgColor = Color(color.hex).isDark() ? 'white' : 'black';
  return (
    <Round color={color} onDone={onRoundDone}>
      <Round.Container>
        <Header as='h1' style={{color: fgColor}}>CSS Color Quiz</Header>
        <Round.Question />
        <Segment>
           <Progress size='medium' value={roundIndex} total={rounds.length} progress='ratio' />
           <Statistic color='green'>
              <Statistic.Value>{correct}</Statistic.Value>
              <Statistic.Label>correct</Statistic.Label>
            </Statistic>
           <Statistic color='red'>
              <Statistic.Value>{incorrect}</Statistic.Value>
              <Statistic.Label>incorrect</Statistic.Label>
           </Statistic>
          {results.reverse().map((x, i) => (<Round.Result {...x} key={i} />))}
        </Segment>
      </Round.Container>
    </Round>
  );
}
