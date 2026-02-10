const asciichart = require("asciichart");

const width = process.stdout.columns || 80;
const height = 30;

const data = Array.from({ length: width }, (_, x) =>
  Math.sin((x / width) * 2 * Math.PI)
);

console.log(asciichart.plot(data, { height }));
