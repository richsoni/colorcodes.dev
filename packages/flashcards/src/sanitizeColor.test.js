import sanitizeColor from './sanitizeColor';

it("returns the color if no exceptions", () => {
  expect( sanitizeColor('blue')).toEqual('blue')
  expect( sanitizeColor('red')).toEqual('red')
})

it("exception cases", () => {
  [
    ["Grey", "gray"],
    ["Magenta", "fuchsia"],
    ["Aqua", "cyan"],
    ["Light Blue", "lightblue"],
    ["Papayawhip", "papayawhip"],
  ].forEach((thing) => {
    expect(sanitizeColor(thing[0])).toEqual(thing[1])
  })
})
