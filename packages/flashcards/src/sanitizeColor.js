import x11 from "@colorcodes/x11";

const colorNames = x11.map((x) => x.name)

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
