import Color from 'color';

const yiq = ({r,g,b}) => {
  return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

export const names = [
  'aliceblue',
  'antiquewhite',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgreen',
  'darkgray',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'magenta',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'green',
  'greenyellow',
  'gray',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgreen',
  'lightgray',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'rebeccapurple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
];

export const basicHue = (hue) =>{
  if(( hue > 319 ) || ( hue > -1 && hue < 18 )){
    return 'red'
  }
  if( hue > 18 && hue < 39 ){
    return 'orange';
  }
  if( hue > 39 && hue < 80 ){
    return 'yellow';
  }
  if ( hue > 81 && hue < 157 ){
    return 'green';
  }
  if ( hue > 157 && hue < 249 ){
    return 'blue';
  }
  if ( hue > 249 && hue < 319 ){
    return 'purple';
  }
}

export default names.reduce((memo, name) => {
  let tags = [];
  const color = Color(name)
  const [h,s,l] = color.hsl().color
  const [r,g,b] = color.rgb().color
  if(new Set([r,g,b]).size === 1){
    tags.push('grayscale')
  } else {
    tags.push(basicHue(h))
  }
  return {
    ...memo,
    [name]: {
      name, r,g,b, h,s,l, tags,
      hex: color.hex(),
      rgb: [r,g,b],
      hsl: [h,s,l],
      yiq: yiq({r,g,b})
    }
  }
},{});
