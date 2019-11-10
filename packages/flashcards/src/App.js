import React, {useState} from 'react';
import './App.css';
import x11 from '@colorcodes/x11';
import {sample} from 'lodash';
import Color from 'color';

function App() {
  const [color, setColor] = useState(sample(x11));
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState({correct: 0, incorrect: 0})
  const fgColor = Color(color.hex).isDark() ? 'white' : 'black'
  return (
    <div className="game" style={{
      background: color.hex,
    }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(e.target.value === color.name){
            setScore({...score, correct: score.correct + 1})
          } else {
            setScore({...score, incorrect: score.incorrect + 1})
          }
          setGuess('')
          setColor(sample(x11))
        }}
      >
        <h1 style={{color: fgColor}}>CSS Color Quiz!</h1>
        <h2 style={{color: fgColor}}>Guess the background by CSS Color name</h2>
        <input
           type='text'
           autoFocus
           value={guess}
           onChange={(e) => setGuess(e.target.value)}
           style={{
             color: fgColor,
             borderColor: fgColor,
           }} />
        <input
           type='submit'
           value='Submit Guess'
           style={{
             background: fgColor,
             color: color.hex,
           }}
        />
        <h2>Score: {score.correct} correct, {score.incorrect} incorrect </h2>
      </form>
    </div>
  );
}

export default App;
