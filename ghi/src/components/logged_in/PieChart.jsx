import { createGradient } from '@daformat/draw-squircle-shapes-with-svg-javascript'
import { paged } from "@esperanc/aggregated-inputs"
import { color } from '@jashkenas/inputs'
import { hexToColorizedColorMatrix, hexToColorizedColorMatrixVariant } from '@pstuffa/hex-code-to-fecolormatrix-filter'
d3 = require('d3@7')


viewof values = controlInterface()

NeumorphismFlat = (defs, blur, distance, color) => {

  const neumorphism = DOM.uid('neumorphism');

  const filter = defs.append('filter')
      .attr('id', neumorphism.id)
      .attr('x', -.1)
      .attr('y', -.1)
      .attr('width', '200%')
      .attr('height', '200%');

  filter.append('feOffset')
    .attr('in', 'SourceGraphic')
    .attr('result', 'offOut')
    .attr('dx', values.blurDistance)
    .attr('dy', values.blurDistance)

  filter.append('feColorMatrix')
    .attr('in', 'offOut')
    .attr('result', 'matrixOut')
    .attr('values', hexToColorizedColorMatrix(d3.color(values.color).darker(.5).hex()))

  filter.append('feOffset')
    .attr('in', 'SourceGraphic')
    .attr('result', 'offOut2')
    .attr('dx', -values.blurDistance / 5)
    .attr('dy', -values.blurDistance / 5)

  filter.append('feColorMatrix')
    .attr('in', 'offOut2')
    .attr('result', 'matrixOut2')
    .attr('values', hexToColorizedColorMatrixVariant(d3.color(values.color).brighter(.15).hex()))

  filter.append('feColorMatrix')
    .attr('in', 'matrixOut2')
    .attr('result', 'matrixOut3')
    .attr('values', hexToColorizedColorMatrix(d3.color(values.color).brighter(.15).hex()))

  filter.append('feGaussianBlur')
    .attr('in', 'matrixOut')
    .attr('result', 'blurOut')
    .attr('stdDeviation', values.blur)

  filter.append('feGaussianBlur')
    .attr('in', 'matrixOut')
    .attr('result', 'blurOut1')
    .attr('stdDeviation', values.blur  *  1.5)

  const feMerge = filter.append('feMerge')
    .attr('result', 'blurredOne');

  feMerge.append('feMergeNode')
    .attr('mode', 'normal')
    .attr('in', 'blurOut');

  feMerge.append('feMergeNode')
    .attr('mode', 'normal')
    .attr('in', 'blurOut1');

  filter.append('feGaussianBlur')
    .attr('in', 'matrixOut3')
    .attr('result', 'blurOut21')
    .attr('stdDeviation', values.blur * 1.5)

  filter.append('feGaussianBlur')
    .attr('in', 'matrixOut3')
    .attr('result', 'blurOut2')
    .attr('stdDeviation', values.blur)

  const feMergeTwo = filter.append('feMerge')
    .attr('result', 'blurred');

  feMergeTwo.append('feMergeNode')
    .attr('mode', 'normal')
    .attr('in', 'blurOut21');

  feMergeTwo.append('feMergeNode')
    .attr('mode', 'normal')
    .attr('in', 'blurOut2');

  filter.append('feBlend')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'blurredOne')
    .attr('mode', 'normal')
    .attr('result', 'blend')

  filter.append('feBlend')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'blurred')
    .attr('mode', 'normal')
    .attr('result', 'blend2')

  filter.append('feBlend')
    .attr('in', 'blend')
    .attr('in2', 'blend2')
    .attr('mode', 'normal')

  return neumorphism

}

NeumorphismFlatForFill = (defs, blur, distance, color) => {

  const neumorphism = DOM.uid('neumorphism');

  const filter = defs.append('filter')
      .attr('id', neumorphism.id)
      .attr('x', -.1)
      .attr('y', -.1)
      .attr('width', '200%')
      .attr('height', '200%');

  filter.append('feOffset')
    .attr('in', 'SourceGraphic')
    .attr('result', 'offOut')
    .attr('dx', values.blurDistance / 2)
    .attr('dy', values.blurDistance / 2)

  filter.append('feColorMatrix')
    .attr('in', 'offOut')
    .attr('result', 'matrixOut')
    .attr('values', hexToColorizedColorMatrix(d3.color(values.color).darker(.5).hex()))

  filter.append('feOffset')
    .attr('in', 'SourceGraphic')
    .attr('result', 'offOut2')
    .attr('dx', -values.blurDistance / 10)
    .attr('dy', -values.blurDistance / 10)

  filter.append('feColorMatrix')
    .attr('in', 'offOut2')
    .attr('result', 'matrixOut2')
    .attr('values', hexToColorizedColorMatrixVariant(d3.color(values.color).brighter(.15).hex()))

  filter.append('feColorMatrix')
    .attr('in', 'matrixOut2')
    .attr('result', 'matrixOut3')
    .attr('values', hexToColorizedColorMatrix(d3.color(values.color).brighter(.15).hex()))

  filter.append('feGaussianBlur')
    .attr('in', 'matrixOut')
    .attr('result', 'blurOut')
    .attr('stdDeviation', values.blur / 2)

  filter.append('feGaussianBlur')
    .attr('in', 'matrixOut')
    .attr('result', 'blurOut1')
    .attr('stdDeviation', values.blur)

  const feMerge = filter.append('feMerge')
    .attr('result', 'blurredOne');

  feMerge.append('feMergeNode')
    .attr('mode', 'normal')
    .attr('in', 'blurOut');

  feMerge.append('feMergeNode')
    .attr('mode', 'normal')
    .attr('in', 'blurOut1');

  filter.append('feGaussianBlur')
    .attr('in', 'matrixOut3')
    .attr('result', 'blurOut21')
    .attr('stdDeviation', values.blur)

  filter.append('feGaussianBlur')
    .attr('in', 'matrixOut3')
    .attr('result', 'blurOut2')
    .attr('stdDeviation', values.blur / 2)

  const feMergeTwo = filter.append('feMerge')
    .attr('result', 'blurred');

  feMergeTwo.append('feMergeNode')
    .attr('mode', 'normal')
    .attr('in', 'blurOut21');

  feMergeTwo.append('feMergeNode')
    .attr('mode', 'normal')
    .attr('in', 'blurOut2');

  filter.append('feBlend')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'blurredOne')
    .attr('mode', 'normal')
    .attr('result', 'blend')

  filter.append('feBlend')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'blurred')
    .attr('mode', 'normal')
    .attr('result', 'blend2')

  filter.append('feBlend')
    .attr('in', 'blend')
    .attr('in2', 'blend2')
    .attr('mode', 'normal')

  return neumorphism

}

NeumorphismPressed = (defs, blur, distance, color) => {

  const neumorphismPressed = DOM.uid('neumorphism_pressed');

  const filter = defs.append('filter')
      .attr('id', neumorphismPressed.id)

  filter.append('feOffset')
    .attr('in', 'SourceGraphic')
    .attr('result', 'offset')
    .attr('dx', -values.blurDistance / 10)
    .attr('dy', -values.blurDistance / 10);

  filter.append('feOffset')
    .attr('dx', values.blurDistance)
    .attr('dy', values.blurDistance / 1.5)
    .attr('in', 'SourceGraphic')
    .attr('result', 'two')

  filter.append('feGaussianBlur')
    .attr('in', 'offset')
    .attr('stdDeviation', values.blur)
    .attr('result', 'offset-blur');

  filter.append('feComposite')
    .attr('operator', 'out')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'offset-blur')
    .attr('result', 'inverse');

  filter.append('feFlood')
    .attr('flood-color', d3.color(values.color).brighter(.5).hex())
    .attr('result', 'color');

  filter.append('feComposite')
    .attr('operator', 'in')
    .attr('in', 'color')
    .attr('in2', 'inverse')
    .attr('result', 'shadow')

  filter.append('feComposite')
    .attr('operator', 'over')
    .attr('in', 'shadow')
    .attr('in2', 'SourceGraphic')
    .attr('result', 'dropOne')


  filter.append('feGaussianBlur')
    .attr('in', 'two')
    .attr('stdDeviation', values.blur)
    .attr('result', 'offset-blur-two');

  filter.append('feComposite')
    .attr('operator', 'out')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'offset-blur-two')
    .attr('result', 'inverse-two');

  filter.append('feFlood')
    .attr('flood-color', d3.color(values.color).darker(.25).hex())
    .attr('result', 'color-two');

  filter.append('feComposite')
    .attr('operator', 'in')
    .attr('in', 'color-two')
    .attr('in2', 'inverse-two')
    .attr('result', 'shadow-two')

  const merged = filter.append('feMerge');

  merged.append('feMergeNode')
    .attr('in', 'dropOne');

  merged.append('feMergeNode')
    .attr('in', 'dropTwo')

  return neumorphismPressed

}

{
  const width = window.innerWidth * .9;
  const height = 500;

  const margin = {top: 10, bottom: 10, left: 10, right: 10};

  const svg = d3.create('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background-color', values.enable.length > 0 ? values.color : 'none')

  const defs = svg.append('defs');

  defs.node().appendChild(createGradient('gradient1', '#5AE0F2', '#70FFF2'));
  defs.node().appendChild(createGradient('gradient2', '#FF2CEF', '#FF74FF'));
  defs.node().appendChild(createGradient('gradient3', '#FFC14A', '#FFEA00'));

  const filter = NeumorphismFlat(defs, values.blur, values.blurDistance, values.color);
  const filterFill = NeumorphismFlatForFill(defs, values.blur, values.blurDistance, values.color);
  const pressedFilter = NeumorphismPressed(defs, values.blur, values.blurDistance, values.color);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const data = [{name: 'One', value: .15}, {name: 'Two', value: .35}, {name: 'Three', value: .5}];

  const radius = Math.min(width, height) / 2

  const outerScale = d3.scaleLinear()
    .range([radius * 0.65, radius - 1])
    .domain(d3.extent(data, d => d.value))


  const arc = d3.arc()
    .innerRadius(50)
    .outerRadius(radius * .9)

  const arcInner = d3.arc()
    .innerRadius(radius * 0.3)
    .outerRadius(radius * .8)
    .cornerRadius(10)

  const pie = d3.pie()
    .value(d => d.value)

  const pieInner = d3.pie()
    .padAngle(0.05)
    .value(d => d.value)

  const arcs = pie(data)
  const arcsInner = pieInner(data)

  const donut = g.append('g')
    .style('filter', filter)
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  g.append('g')
    .style('filter', filter)
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .append('circle')
    .attr('r', 50)
    .attr('fill', values.color)

  const donutEmptyInner = g.append('g')
    .style('filter', pressedFilter)
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const donutInner = g.append('g')
    .style('filter', filterFill)
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const paths = donut.selectAll('.outer')
    .data(arcs)
    .join('path')
    .attr('class', 'outer')
    .attr('fill', values.color)
    .attr('d', arc)

  const color = d3.scaleOrdinal()
    .domain(['One', 'Two', 'Three'])
    .range(['gradient1', 'gradient2', 'gradient3']);

  const emptyInner = donutEmptyInner.selectAll('.empty')
    .data(arcsInner)
    .join('path')
    .attr('class', 'empty')
    .attr('fill', values.color)
    .style('fill-opacity', (d,i) => i == 1 ? 0 : 1)
    .attr('d', arcInner)

  const innerPaths = donutInner.selectAll('.inner')
    .data(arcsInner)
    .join('path')
    .attr('class', 'inner')
    .style('fill', d => `url(#${color(d.data.name)})`)
    .style('fill-opacity', (d,i) => i == 1 ? 1 : 0)
    .attr('d', arcInner)

  let j = 0;

  while(true) {
    await Promises.delay(1000)
    emptyInner.transition().style('fill-opacity', (d,i) => i == j ? 0 : 1)
    innerPaths.transition().style('fill-opacity', (d,i) => i == j ? 1 : 0)
    j++;
    if(j == 3) {
      j = 0;
    }
    yield svg.node()
  }
}


width = window.innerWidth * .9;
height = 600
margin = ({top: 10, bottom: 10, left: 10, right: 10})
//
// Interfaces for parameters that control the intersection avoidance mechanism
//
function controlInterface(title, defaults = {}) {
  return paged({
      color: color({
      value: "#ededed", //"#eaece4", //
    }),
    blur: Inputs.range([0, 20], {
      label: "Blur",
      step: .1,
      value: 5
    }),
    blurDistance: Inputs.range([0, 30], {
      label: "Neumorphism Distance",
      value: 10,
      step: 0.1
    }),
    enable: Inputs.checkbox(["yes"], {
      label: "Background Color Matches Neumorphism Color?",
      value: ["yes"]
    }),
  });
}
