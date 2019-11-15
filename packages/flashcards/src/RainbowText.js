import React from 'react';
import {shuffle, sample} from 'lodash';
import {html4} from '@colorcodes/x11';

const defaultColors = html4.filter((c) => ![
  'white',
  'silver',
  'yellow',
].includes(c.name))

export default ({colors = defaultColors, children}) => {
  return children.split('').map((c, i) => (
    <span
      key={`${i}${c}`}
      style={{
        color: sample(colors).name
      }}
    >{c}</span>
  ));
}
