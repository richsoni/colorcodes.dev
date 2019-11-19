import React from "react";
import {Statistic, Segment} from 'semantic-ui-react';
import Round from "./Round";


export default (props) => {
  const {results} = props;
  const correct = results.filter(item => item.isCorrect).length;
  const incorrect = results.filter(item => !item.isCorrect).length;

  return(
    <Segment>
      <Statistic horizontal size="mini" color="green">
        <Statistic.Value>{correct}</Statistic.Value>
        <Statistic.Label>correct</Statistic.Label>
      </Statistic>
      <Statistic horizontal size="mini" color="red">
        <Statistic.Value>{incorrect}</Statistic.Value>
        <Statistic.Label>incorrect</Statistic.Label>
      </Statistic>
      {[...results].reverse().map((x, i) => (
        <Round.Result {...x} key={x.state.color.name} />
      ))}
    </Segment>
  )
}

