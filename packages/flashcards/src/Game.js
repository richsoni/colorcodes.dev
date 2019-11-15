import React, {useState, useReducer} from 'react';
import './App.css';
import {shuffle} from 'lodash';
import x11 from '@colorcodes/x11';
import {sample} from 'lodash';
import Color from 'color';
import {Message,Menu, Progress, Statistic, Icon, Label, Input, Container, Segment, Header, Button, Form} from 'semantic-ui-react';
import Question from './Question';
import Round from './Round';
import {LogoSegment} from './Logo';

const Results = ({children}) => {
  if(React.Children.count(children)){
    return <Segment>
      <Header as='h1'>Results</Header>
      {children}
    </Segment>
  } else {
    return <div />
  }
}
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
        <Segment attached>
            <Message
              icon='question'
              header='Given The Following Card'
              content="Guess It's X11 Color"
            />
        <LogoSegment backgroundColor={color.hex} color={fgColor}/>
        <Round.Question />
        </Segment>
        <Segment>
           <Header>Progress</Header>
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
