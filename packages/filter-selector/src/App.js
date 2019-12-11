import React, {useState} from 'react';
import './App.css';
import { Table, Checkbox, Select, Card, Item, Menu, Icon, Sidebar, Button, Label, List, Input, Header, Container, Segment, Form } from 'semantic-ui-react';
import x11 from "@colorcodes/x11";
import Color from "color";
import Logo from './Logo';
import ColorTable from './ColorTable';
import {Rnd} from 'react-rnd';

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

const getSortValue = (c) => {
  // https://stackoverflow.com/questions/3014402/sorting-a-list-of-colors-in-one-dimension
  const {h,s,l} = hsl(c.name)
  return l * 5 + s * 2 + h
}

function App() {
  const [hslFilter, setHslFilter] = useState({h: 0, s: 0, l: 0})
  const [rndState, setRndState] = useState({
    width: 100,
    x: 0,
  })
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
        <Segment
            style={{
              background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
              position: 'relative'
            }}
    >
       <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <Rnd
          dragAxis='x'
          bounds='parent'
          size={{ width: rndState.width,  height: rndState.height }}
          enableResizing={{ top:false, right:true, bottom:false, left:true, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
          position={{ x: rndState.x, y: 0}}
          onDragStop={(e, d) => { setRndState({...rndState, x: d.x, y: d.y}) }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setRndState({
                width: ref.style.width, 
                height: ref.style.height,
                ...position
            })
          }}
        >
          001
        </Rnd>
    </div>
        </Segment>
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
         <ColorTable colors={colors} />
      </Segment>
    </Container>
    </>
  );
}

export default App;
