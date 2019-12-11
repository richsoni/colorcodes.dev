import React, {useState, useEffect} from 'react';
import { Table, Label, } from 'semantic-ui-react';
import {sortBy} from 'lodash';
import Color from "color";

const fgColor = (color) => {
 return Color(color).isDark() ? "white" : "black";
}

const rgb = (color) => {
  const [r,g,b] = Color(color).rgb().color
  return {r,g,b}
}

const hsl = (color) => {
  const [h,s,l] = Color(color).hsl().color
  return {h,s,l}
}

const ColorTable = ({colors}) => {
 const [sortState, setSortState] = useState({
   direction: 'ascending',
   tableData: colors,
   column: null,
 })

 useEffect(() => {
   setSortState({
     ...sortState,
     tableData: colors,
   })
 },[colors])
 return <Table
     tableData={sortState.tableData}
     sortable
     renderBodyRow={ColorTable.Row}
     headerRow={() => (
       <Table.Row>{[
         {name: 'Color', sort: ({name}) => name},
         {name: 'Red', sort: ({name}) => rgb(name).r, style: {width: '6em'}},
         {name: 'Green', sort: ({name}) => rgb(name).g, style: {width: '6em'}},
         {name: 'Blue', sort: ({name}) => rgb(name).b, style: {width: '6em'}},
         {name: 'Hue', sort: ({name}) => hsl(name).h},
         {name: 'Sat', sort: ({name}) => hsl(name).s},
         {name: 'Lum', sort: ({name}) => hsl(name).l},
       ].map((cell) => (
         <Table.HeaderCell
           sorted={sortState.column === cell.name ? sortState.direction : null}
           style={{...cell.style}}
           onClick={() => {
             if(sortState.column !== cell.name){
               setSortState({
                 ...sortState,
                 column: cell.name,
                 direction: 'ascending',
                 tableData: sortBy(colors, cell.sort).reverse()
               });
             } else {
               setSortState({
                 ...sortState,
                 direction: sortState.direction === 'ascending' ? 'descending' : 'ascending',
                 tableData: sortState.tableData.reverse()
               })
             }
           }}
         >{cell.name}</Table.HeaderCell>
       ))}
       </Table.Row>
     )}
    />
}

const Range = ({background, left, colorName}) => (
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
      background,
    }}>
      <div style={{
        backgroundColor: colorName,
        border: '1px solid darkgray',
        top: '25%',
        left: left,
        width: '4px',
        height: '1em',
        position: 'absolute',
      }} />
  </div>
 </div>
)

ColorTable.Row = ({
  name,
}, index) => (
 <Table.Row
   key={name}
 >
   <Table.Cell
     textAlign="center"
     verticalAlign="middle"
     style={{
       background: name,
         color: fgColor(name),
         textAlign: 'center',
     }}
   >{name}</Table.Cell>
   <Table.Cell><Label color='red'>r: {rgb(name).r}</Label></Table.Cell>
   <Table.Cell><Label color='green'>g: {rgb(name).g}</Label></Table.Cell>
   <Table.Cell><Label color='blue'>b: {rgb(name).b}</Label></Table.Cell>
   <Table.Cell>
    <Range
      background='linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
      left={(hsl(name).h / 360) * 100}
      colorName={name}
    />
   </Table.Cell>
   <Table.Cell>
    <Range
      background='linear-gradient(to right, rgba(0,0,0, 0) 0%, rgba(0,0,0, 1) 100%)'
      left={(hsl(name).s / 360) * 100}
      color={name}
    />
   </Table.Cell>
   <Table.Cell>
    <Range
      background='linear-gradient(to right, rgba(0,0,0, 0) 0%, rgba(0,0,0, 1) 100%)'
      left={(hsl(name).l / 360) * 100}
      color={name}
    />
   </Table.Cell>
 </Table.Row>
);


export default ColorTable;
