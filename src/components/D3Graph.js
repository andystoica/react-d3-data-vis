import { axisBottom, axisLeft, curveBasis, line, max, scaleLinear, select } from 'd3';
import './D3Graph.css';

const MARGIN = { TOP: 10, BOTTOM: 60, LEFT: 50, RIGHT: 10 };
const WIDTH = 620 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 550 - MARGIN.TOP - MARGIN.BOTTOM;


class D3Graph {
  
  constructor(element, data) {
    let vis = this;
    vis.data = data;
        
    // SVG Canvas
		vis.g = select(element)
    .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);
      
    // Axis groups
    vis.xAxisGroup = vis.g.append('g')
      .attr('transform', `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.g.append('g');

		// Labels
		vis.g
			.append('text')
				.attr('x', WIDTH / 2)
				.attr('y', HEIGHT + 50)
				.attr('font-size', 14)
				.attr('text-anchor', 'middle')
				.text('Sampled time');
		vis.g
			.append('text')
				.attr('x', -(HEIGHT / 2))
				.attr('y', -40)
				.attr('transform', 'rotate(-90)')
				.attr('font-size', 14)
				.attr('text-anchor', 'middle')
				.text('Sensor value');

    // Line Generator
    const xVal = d => d.time;
    const yVal = d => d.value;
    vis.lineGenerator = line()
      .x(d => vis.xScale(xVal(d)))
      .y(d => vis.yScale(yVal(d)))
      .curve(curveBasis);
        
    // Initial render
    vis.update(data);
  }
  
  
  update(data) {
    let vis = this;
    vis.data = data;
    
    // Scales    
    vis.xScale = scaleLinear()
      .domain([0, 55])
      .range([0, WIDTH])
      .nice();
    vis.yScale = scaleLinear()
      .domain([0, max(data, d => d.max)])
      .range([HEIGHT, 0])
      .nice();
    
    // Axis
    const xAxisCall = axisBottom(vis.xScale);
    vis.xAxisGroup.transition(1000).call(xAxisCall);
    const yAxisCall = axisLeft(vis.yScale);
    vis.yAxisGroup.transition(1000).call(yAxisCall);
    
    // Join
    const lines = vis.g.selectAll('.line-path').data(vis.data);              
    
    // Exit
    lines.exit().remove()
    
    // Update
    lines
      .transition().duration(500)
      .attr('d', d => vis.lineGenerator(d.values))
      .attr('stroke', d => d.color)
    
    // Enter
    lines.enter()
      .append('path')
        .attr('d', d => vis.lineGenerator(d.values))
        .attr('class', 'line-path')
        .attr('stroke', d => d.color)
  }
}

export default D3Graph;