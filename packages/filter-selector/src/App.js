import React, {useState} from 'react';
import logo from './logo.svg';
import {min, difference} from 'lodash';
import './App.css';
import { Table, Checkbox, Select, Card, Item, Menu, Icon, Sidebar, Button, Label, List, Input, Header, Container, Segment, Form } from 'semantic-ui-react';
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

const FilterCheckbox = ({value, onChange}) => (
  <Checkbox checked={value} onChange={(e, {checked}) => onChange(checked)} toggle label={value ? 'ON' : 'OFF'} />
)

const hsl = (color) => {
  const [h,s,l] = Color(color).hsl().color
  return {h,s,l}
}

const distance = (i, i2) => Math.abs(i - i2)
const square = (i) => i*i

const filterConfig = {
  grayscale: {
    title: "Grayscale Colors",
    filter: ({color}) => new Set(color.rgb).size === 1,
    control: FilterCheckbox,
    initialValue: false,
  },

  notgray: {
    title: "Not Grayscale",
    filter: ({color}) => new Set(color.rgb).size > 1,
    control: FilterCheckbox,
    initialValue: false,
  },

  hsl: { title: "HSL Center",
    filter: ({color, value}) => {
      const colorHSL = hsl(color.name)
      const valueHSL = hsl(value)
      const hDistance = distance(colorHSL.h, valueHSL.h);
      const sDistance = distance(colorHSL.s, valueHSL.s);
      const lDistance = distance(colorHSL.l, valueHSL.l);
      const hThresh = square(Math.log(valueHSL.h + 1) + 1)
      console.log(hThresh)
      switch(value) {
        default: return hDistance < hThresh && sDistance < 90 && lDistance < 50;
      }
    },
    control: ({value, onChange}) => (<Button.Group>
        {['red','orange','yellow','green','blue','violet'].map((color) => (
          <Button color={color} onClick={() => onChange(color)}>{color}</Button>
        ))}
      </Button.Group>),
    initialValue: 'red',
  },
}

const rgbSum = (color) => {
  return color.rgb[0] + color.rgb[1] + color.rgb[2];
}

const fgColor = (color) => {
 return Color(color).isDark() ? "white" : "black";
}

const getSortValue = (c) => {
  // https://stackoverflow.com/questions/3014402/sorting-a-list-of-colors-in-one-dimension
  const {h,s,l} = hsl(c.name)
  return l * 5 + s * 2 + h
}

const RangePosition = ({color, left}) => (
  <div style={{
    backgroundColor: color.name,
    border: '1px solid darkgray',
    top: '25%',
    left: left,
    width: '4px',
    height: '1em',
    position: 'absolute',
  }} />
)

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
      background: `linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
    }}>
    <RangePosition left={`${(hsl(color.name).h/360)*100}%`} color={color} />
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
    <RangePosition left={`${hsl(color.name).l}%`} color={color} />
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
      background: `linear-gradient(to right, rgba(0,0,0, 0) 0%,
        rgba(0,0,0, 1) 100%)`,
    }}>
    <RangePosition left={`${hsl(color.name).s}%`} color={color} />
  </div>
 </div>
)

function App() {
  const [hslFilter, setHslFilter] = useState({h: 0, s: 0, l: 0})
  const [filters, setFilters] = useState(Object
    .keys(filterConfig)
    .reduce((keys, key) => ({...keys, [key]: filterConfig[key].initialValue}), {})
  )
  const hue = hslFilter.h;

  const colors = Object
    .keys(filters)
    .filter((key) => filters[key]) //enabled filters
    .reduce((colors, key) => {
      const filter = filterConfig[key].filter
      return colors.filter((color) =>
        filter({
          color,
          value: filters[key]
        })
      );
    }, x11)
    .sort((a,b) => getSortValue(a) - getSortValue(b))

  return (<>
    <Menu size='massive'>
      <Menu.Item style={{backgroundColor: 'mintcream'}}><Logo /></Menu.Item>
    </Menu>
    <Container>
       <Segment>
        <Header as='h1'>Filters</Header>
        <List>
          {Object
            .keys(filterConfig)
            .map((key) => {
              const config = filterConfig[key];
              const Control = config.control;
              console.log(config.title, filters[key])
              return (
                <List.Item key={key}>
                  <List.Header>{config.title}</List.Header>
                  <Control
                    value={filters[key]}
                    config={filterConfig[key]}
                    onChange={(value) => setFilters({...filters, [key]: value})} />
                </List.Item>
              )
            })
          }
          </List>
       </Segment>
       <Segment>
         <Header as='h1'>Colors {Math.max(...x11.map((x) => hsl(x.name).h))}</Header>
         <Header as='h4'>{colors.length} of {x11.length} shown</Header>
         <Table>
           <Table.Header>
             <Table.Row>
               <Table.HeaderCell>Color</Table.HeaderCell>
               <Table.HeaderCell style={{width: '6em'}}>Red</Table.HeaderCell>
               <Table.HeaderCell style={{width: '6em'}}>Green</Table.HeaderCell>
               <Table.HeaderCell style={{width: '6em'}}>Blue</Table.HeaderCell>
               <Table.HeaderCell>Hue</Table.HeaderCell>
               <Table.HeaderCell>Sat</Table.HeaderCell>
               <Table.HeaderCell>Lum</Table.HeaderCell>
             </Table.Row>
           </Table.Header>
           <Table.Body>
             {colors.map((color) => (<Table.Row
                 key={color.name}
               >
                <Table.Cell
                   textAlign="center"
                   verticalAlign="middle"
                   style={{
                     background: color.name,
                     color: fgColor(color.name),
                     textAlign: 'center',
                   }}
                >{color.name}</Table.Cell>
                <Table.Cell><Label color='red'>r: {color.rgb[0]}</Label></Table.Cell>
                <Table.Cell><Label color='green'>g: {color.rgb[1]}</Label></Table.Cell>
                <Table.Cell><Label color='blue'>b: {color.rgb[2]}</Label></Table.Cell>
                <Table.Cell><HueStat color={color} /></Table.Cell>
                <Table.Cell><SatStat color={color} /></Table.Cell>
                <Table.Cell> <LightStat color={color} /></Table.Cell>
               </Table.Row>
             ))}
          </Table.Body>
       </Table>
      </Segment>
    </Container>
    </>
  );
}

export default App;
