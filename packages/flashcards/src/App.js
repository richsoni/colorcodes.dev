import React, {useState} from 'react';
import './App.css';
import x11 from '@colorcodes/x11';

function App() {
  return (
    <div className="App">
      {x11.map((x) => {
        return <div style={{width: '100px', height: '100px', backgroundColor: x}}>{x}</div>
      })}
    </div>
  );
}

export default App;
