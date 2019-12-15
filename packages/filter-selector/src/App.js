import React, {useState} from 'react';
import './App.css';
import { Checkbox, Menu, Label, List, Header, Container, Segment } from 'semantic-ui-react';
import colors from "@colorcodes/colors";
import Logo from './Logo';
import ColorTable from './ColorTable';
import { Range, getTrackBackground } from 'react-range';

const FilterCheckbox = ({value, onChange}) => (
  <Checkbox checked={value} onChange={(e, {checked}) => onChange(checked)} toggle label={value ? 'ON' : 'OFF'} />
)

const filterConfig = {
  grayscale: {
    title: "Color is Grayscale",
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
      const hue = color.h
      const min = value[0]
      return hue >= value[0] && hue <= value[1]
    },

    control: ({value, onChange}) => {
      const MAX = 352;
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
        renderThumb={({ props, index}) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '100%',
              width: '1em',
              backgroundColor: 'black'
            }}
          >
            <div style={{position: 'relative', top: '-1.5em', right: '.5em',}}>
               <Label circular color='black'>{value[index]}</Label>
            </div>
          </div>
        )}
      />
    </Segment>)},

    initialValue: [0,352],
  },
}

const getSortValue = (color) => (
  // https://stackoverflow.com/questions/3014402/sorting-a-list-of-colors-in-one-dimension
  color.l * 5 + color.s * 2 + color.h
)

function App() {
  const [filters, setFilters] = useState(Object
    .keys(filterConfig)
    .reduce((keys, key) => ({...keys, [key]: filterConfig[key].initialValue}), {})
  )

  const results = Object
    .keys(filters)
    .filter((key) => filters[key]) //enabled filters
    .reduce((results, key) => {
      const filter = filterConfig[key].filter
      console.log(key)
      return results.filter((color) =>
        filter({
          color,
          value: filters[key]
        })
      );
    }, Object.values(colors))
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
         <Header as='h4'>{results.length} of {Object.keys(colors).length} shown</Header>
         <ColorTable colors={results} />
      </Segment>
    </Container>
    </>
  );
}

export default App;
