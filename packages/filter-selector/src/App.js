import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Checkbox, Label, List, Input, Header, Container, Segment, Form } from 'semantic-ui-react';
import x11 from "@colorcodes/x11";
import Color from "color";

const RELATIONALS = {
  ABOVE: 'ABOVE',
  BELOW: 'BELOW'
}

const Relational = ({params, onChange, relational}) => {
  return <Button active={relational === params.relational} onClick={() => onChange({relational: RELATIONALS[relational]})} >{relational}</Button>
}
const ColorFilter = ({params, color, onChange = () => {}}) => {
   const changeHandler = (newParams) => {
     onChange({
       ...params,
       ...newParams
     })
   }

   return (<>
       <Button label={{color: color, content: params.value}} content={color} color={color} />
       <div>
         <input value={params.value} onChange={(e) => (changeHandler({value: e.target.value}))}
         type='range'
         min={0}
         max={255}
         />
       </div>
       <Button.Group size='mini'>
         <Relational onChange={changeHandler} params={params} relational={RELATIONALS.BELOW} />
         <Button.Or />
         <Relational onChange={changeHandler} params={params} relational={RELATIONALS.ABOVE} />
       </Button.Group>
   </>);
}

const filterColor = (rgb, params) => {
  if(params.relational === RELATIONALS.ABOVE){
      return rgb >= params.value
  }
  if(params.relational === RELATIONALS.BELOW){
    return rgb <= params.value
  }
  return true
}

const initialColorState = {
  value: 0,
  relational: RELATIONALS.ABOVE,
}

function App() {
  const [redFilter, setRedFilter] = useState(initialColorState);
  const [greenFilter, setGreenFilter] = useState(initialColorState);
  const [blueFilter, setBlueFilter] = useState(initialColorState);

  const colors = x11
    .filter((color => filterColor(color.rgb[0], redFilter)))
    .filter((color => filterColor(color.rgb[1], greenFilter)))
    .filter((color => filterColor(color.rgb[2], blueFilter)))
  return (
    <Container>
       <Segment>
        <Header as='h1'>Filters</Header>
        <div className='rgb-grid'>
          <ColorFilter color='red' params={redFilter} onChange={setRedFilter} />
          <ColorFilter color='green' params={greenFilter} onChange={setGreenFilter} />
          <ColorFilter color='blue' params={blueFilter} onChange={setBlueFilter} />
        </div>
       </Segment>
       <Segment>
         <Header as='h1'>Colors</Header>
         <Header as='h4'>{colors.length} of {x11.length} shown</Header>
         {colors.map((color) => {
           const fgColor = Color(color.hex).isDark() ? "white" : "black";
           return (<Segment
             key={color.name}
             style={{
               background: color.hex,
               padding: "2em 0em",
               color: fgColor,
             }}
           >
            <Container textAlign="center" text>
               {color.name}
            </Container>
           </Segment>
         )})}
      </Segment>
    </Container>
  );
}

export default App;
