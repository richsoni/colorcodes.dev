import React, {useState} from 'react';
import './App.css';
import { Table, Checkbox, Select, Card, Item, Menu, Icon, Sidebar, Button, Label, List, Input, Header, Container, Segment, Form } from 'semantic-ui-react';
import x11 from "@colorcodes/x11";
import Color from "color";
import Logo from './Logo';
import ColorTable from './ColorTable';
import {Rnd} from 'react-rnd';
import { Range, getTrackBackground } from 'react-range';

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

  hue: { title: "Hue Range",
    filter: ({color, value}) => {
      const hue = hsl(color.name).h
      const min = value[0]
      return hue >= value[0] && hue <= value[1]
    },

    control: ({value, onChange}) => {
      const MAX = 351;
      return ( <Segment
        style={{
          background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
          border: 0,
          padding: 0,
          width:'100%',
          height: '3em',
          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
    >
      <Range
        step={1}
        min={0}
        max={MAX}
        values={value}
        onChange={values => onChange(values)}
        renderTrack={({ props, children }) => (
          <div
          {...props}
            style={{
              height: '6px',
              background: getTrackBackground({values: value, min: 0, max: MAX, colors: ['transparent', 'black', 'transparent']}),
              width: '100%',
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '100%',
              width: '1em',
              backgroundColor: 'black'
            }}
          />
        )}
      />
    </Segment>)},

    initialValue: [50,75],
  },
}

const getSortValue = (c) => {
  // https://stackoverflow.com/questions/3014402/sorting-a-list-of-colors-in-one-dimension
  const {h,s,l} = hsl(c.name)
  return l * 5 + s * 2 + h
}

const Handle = ({translateX}) => (
  <Label circular color='black' empty style={{transform: `translate(${translateX}, 50%)`}} />
)

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
        <List>
          {Object
            .keys(filterConfig)
            .map((key) => {
              const config = filterConfig[key];
              const Control = config.control;
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
         <Header as='h1'>Colors</Header>
         <Header as='h4'>{colors.length} of {x11.length} shown</Header>
         <ColorTable colors={colors} />
      </Segment>
    </Container>
    </>
  );
}

export default App;
