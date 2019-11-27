import React, {useState} from 'react';
import logo from './logo.svg';
import {min} from 'lodash';
import './App.css';
import { Checkbox, Select, Card, Item, Menu, Icon, Sidebar, Button, Label, List, Input, Header, Container, Segment, Form } from 'semantic-ui-react';
import x11 from "@colorcodes/x11";
import Color from "color";
import Logo from './Logo';

const RELATIONALS = {
  ABOVE: 'ABOVE',
  BELOW: 'BELOW'
}

const options = [
  { key: 'all', text: 'All', value: 'all' },
  { key: 'articles', text: 'Articles', value: 'articles' },
  { key: 'products', text: 'Products', value: 'products' },
]

const Relational = ({params, onChange, relational}) => {
  return <Button active={relational === params.relational} onClick={() => onChange({relational: RELATIONALS[relational]})} >{relational}</Button>
}

const Filter = ({title, checked, onChange}) => {
  return (<Segment>
    <Header as='h3'>
      {title}&nbsp;&nbsp;
      <Checkbox checked={checked} onChange={() => onChange({[title]: !checked})} toggle label={checked ? 'ON' : 'OFF'} />
    </Header>
  </Segment>)
}

const ColorFilter = ({params, color, onChange = () => {}}) => {
   const changeHandler = (newParams) => {
     onChange({
       ...params,
       ...newParams
     })
   }

   return (<Card>
       <ColoredCardContent color={color} />
       <Input max={255} min={0} onChange={(e) => (changeHandler({value: e.target.value}))} labelPosition='left' type='number' value={params.value} action>
         <input />
       </Input>
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
   </Card>);
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

const rgbSum = (color) => {
  return color.rgb[0] + color.rgb[1] + color.rgb[2];
}

const fgColor = (color) => {
 return Color(color).isDark() ? "white" : "black";
}

const ColoredCardContent = ({color}) => {
  return (<Card.Content
     textAlign="center"
     style={{
       background: color,
       padding: "2em 0em",
       color: fgColor(color),
     }}
  >{color}</Card.Content>)

}

const ColorButton = ({hueFilter, color}) => {
  const [hue, setHue] = hueFilter;
  return (<Button
     onClick={() => hueFilter[1](Color(color).hsl().color[0])}
     active={hueFilter[0] === color}
     inverted
     color={color}
  >{color.toUpperCase()}</Button>);
}

const getDominantRGB = (rgb) => {
  return 0
}

const getSortValue = (c) => {
  // https://stackoverflow.com/questions/3014402/sorting-a-list-of-colors-in-one-dimension
  const color = Color(c.name)
  const hsl = color.hsl()
  return hsl.color[2] * 5 + hsl.color[2] * 2 + hsl.color[0]
}
function App() {
  const hueFilter = useState(-1)
  const [hue, setHue] = hueFilter;
  const [filters, setFilters] = useState({
    'Grayscale': true,
  })

  const colors = x11
    .filter((c) => {
      if(hue < 0) return true
      if(c.name === 'black') return false;
      const color = Color(c.name)
      const distance = Math.abs(hue - color.hsl().color[0])
      return distance < 60;
    })
    .sort((a,b) => getSortValue(a) - getSortValue(b))

  return (<>
    <Menu size='massive'>
      <Menu.Item style={{backgroundColor: 'mintcream'}}><Logo /></Menu.Item>
    </Menu>
    <Container>
       <Segment>
        <Header as='h1'>Filters</Header>
        <Filter checked={filters['Grayscale']} title='Grayscale' onChange={(state) => setFilters({...state})} />
        <Segment>
          <Header as='h3'>Dominant Color &nbsp;&nbsp;<Checkbox checked={hue > -1} onChange={() => setHue(hue > -1 ? -1 : 'red')} toggle label={hue > -1 ? 'ON' : 'OFF'} /></Header>
          <ColorButton color='red' hueFilter={hueFilter} />
          <ColorButton color='orange' hueFilter={hueFilter} />
          <ColorButton color='yellow' hueFilter={hueFilter} />
          <ColorButton color='green' hueFilter={hueFilter} />
          <ColorButton color='blue' hueFilter={hueFilter} />
          <ColorButton color='pink' hueFilter={hueFilter} />
        </Segment>
       </Segment>
       <Segment>
         <Header as='h1'>Colors</Header>
         <Header as='h4'>{colors.length} of {x11.length} shown</Header>
         <Card.Group >
           {colors.map((color) => (<Card
               key={color.name}
             >
              <ColoredCardContent color={color.name} />
              <Card.Content extra>
                <Label color='red'>{color.rgb[0]}</Label>
                <Label color='green'>{color.rgb[1]}</Label>
                <Label color='blue'>{color.rgb[2]}</Label>
              </Card.Content>
             </Card>
           ))}
        </Card.Group>
      </Segment>
    </Container>
    </>
  );
}

export default App;
