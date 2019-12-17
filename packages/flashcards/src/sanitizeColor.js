const substitutions = [
  ["grey", "gray"],
  ["magenta", "fuchsia"],
  ["aqua", "cyan"],
  [/\s/, ''],
]

const replace = (src, subs) => "".replace.apply(src, subs)

export default (color, subs = substitutions) =>
  subs
    .reduce(replace,
      color.toLowerCase()
    )