import React, {useState} from 'react';
import logo from './logo.svg';
import {min, difference} from 'lodash';
import './App.css';
import { Checkbox, Select, Card, Item, Menu, Icon, Sidebar, Button, Label, List, Input, Header, Container, Segment, Form } from 'semantic-ui-react';
import x11 from "@colorcodes/x11";
import Color from "color";
import Logo from './Logo';
import { HuePicker} from 'react-color';
import { CustomPicker } from 'react-color';
var { Alpha } = require('react-color/lib/components/common');


const MyAlphaCard = CustomPicker((props) => {
  console.log(props)
  return <div style={{position: 'relative', width: '100%', height: '50px'}}>
    <Alpha value={0.2} {...props} />
  </div>
})

const filterConfig = {
  grayscale: {
    title: "Grayscale Colors",
    fn: (array) => array.filter((color) => new Set(color.rgb).size === 1)
  },

  notgray: {
    title: "Not Grayscale",
    fn: (array) => array
      .filter((color) => (color) => new Set(color.rgb).size > 1)
  },

  hsl: {
    title: "HSL Center",
    fn: (props) => {
      const {hue, color} = props;
      return true
      // if(hue < 0) return true
      // if(c.name === 'black') return false;
      // const color = Color(c.name)
      // const distance = Math.abs(hue - color.hsl().color[0])
      // return distance < 60;
    }
  },
}

const Filter = ({config, checked, onToggle}) => {
  return (<Segment>
    <Header as='h3'>
      {config.title}&nbsp;&nbsp;
      <Checkbox checked={checked} onChange={(e, {checked}) => onToggle(checked)} toggle label={checked ? 'ON' : 'OFF'} />
    </Header>
  </Segment>)
}

const rgbSum = (color) => {
  return color.rgb[0] + color.rgb[1] + color.rgb[2];
}

const fgColor = (color) => {
 return Color(color).isDark() ? "white" : "black";
}

const hsl = (color) => {
  const [h,s,l] = Color(color).hsl().color
  return {h,s,l}
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

const getSortValue = (c) => {
  // https://stackoverflow.com/questions/3014402/sorting-a-list-of-colors-in-one-dimension
  const color = Color(c.name)
  const hsl = color.hsl()
  return hsl.color[2] * 5 + hsl.color[2] * 2 + hsl.color[0]
}

const HueStat = ({color}) => (
  <div style={{
    width: '100%',
    height: '2em',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      width: '100%',
      height: '.5em',
      background: `linear-gradient(to right, rgba(0,0,0, 0) 0%,
        rgba(0,0,0, 1) 100%)`,
    }}>
    <div style={{
      borderRadius: '1em',
      backgroundColor: color.name,
      top: '25%',
      left: hsl(color.name).s,
      width: '1em',
      height: '1em',
      position: 'absolute',
    }} />
  </div>
 </div>
)

const LightStat = ({color}) => (
  <div style={{
    width: '100%',
    height: '2em',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      width: '100%',
      height: '.5em',
      background: `linear-gradient(to right, rgba(0,0,0, 1) 0%,
        rgba(0,0,0,0) 100%)`,
    }}>
    <div style={{
      borderRadius: '1em',
      backgroundColor: color.name,
      top: '25%',
      left: hsl(color.name).l,
      width: '1em',
      height: '1em',
      position: 'absolute',
    }} />
  </div>
 </div>
)

const SatStat = ({color}) => (
  <div style={{
    width: '100%',
    height: '2em',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      width: '100%',
      height: '.5em',
      background: `linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
    }}>
    <div style={{
      borderRadius: '1em',
      backgroundColor: color.name,
      top: '25%',
      left: hsl(color.name).h,
      width: '1em',
      height: '1em',
      position: 'absolute',
    }} />
  </div>
 </div>
)

function App() {
  const [hslFilter, setHslFilter] = useState({h: 0, s: 0, l: 0})
  const [filters, setFilters] = useState(Object
    .keys(filterConfig)
    .reduce((keys, key) => ({...keys, [key]: false}), {})
  )
  const hue = hslFilter.h;

  const colors = Object
    .keys(filters)
    .filter((key) => filters[key]) //enabled filters
    .reduce((colors, key) => (filterConfig[key].fn(colors)), x11)
    .sort((a,b) => getSortValue(a) - getSortValue(b))

  return (<>
    <Menu size='massive'>
      <Menu.Item style={{backgroundColor: 'mintcream'}}><Logo /></Menu.Item>
    </Menu>
    <Container>
       <Segment>
        <Header as='h1'>Filters</Header>
        {Object
          .keys(filterConfig)
          .map((key) => <Filter
            key={key}
            checked={filters[key]}
            config={filterConfig[key]}
            onToggle={(value) => setFilters({...filters, [key]: value})}
          />
          )
        }
        <HuePicker hsl={{h: hue, s: 0, l: 0}} onChangeComplete={(color) => setHslFilter(color.hsl)} />
        <Segment>
          <Header as='h3'>Dominant Color &nbsp;&nbsp;<Checkbox checked={filters} onChange={() => setFilters({HSL: !filters.HSL})} toggle label={hue > -1 ? 'ON' : 'OFF'} /></Header>
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
                <Label color='red'>r: {color.rgb[0]}</Label>
                <Label color='green'>g: {color.rgb[1]}</Label>
                <Label color='blue'>b: {color.rgb[2]}</Label>
                <HueStat color={color} />
                <SatStat color={color} />
                <LightStat color={color} />
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
