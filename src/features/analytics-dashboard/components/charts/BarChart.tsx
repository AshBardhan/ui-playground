import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ChartDataPoint } from '../../types/chart';

interface BarChartProps {
	data: ChartDataPoint[];
	color?: string;
	width?: number;
	height?: number;
}

export const BarChart = ({ data, color = '#10b981', width = 600, height = 300 }: BarChartProps) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!svgRef.current || !containerRef.current || data.length === 0) return;

		// Get container dimensions
		const containerWidth = containerRef.current.clientWidth;
		const containerHeight = height;

		// Clear previous chart
		d3.select(svgRef.current).selectAll('*').remove();

		// Set up margins and dimensions
		const margin = { top: 20, right: 30, bottom: 60, left: 80 };
		const chartWidth = containerWidth - margin.left - margin.right;
		const chartHeight = containerHeight - margin.top - margin.bottom;

		// Create SVG
		const svg = d3
			.select(svgRef.current)
			.attr('width', containerWidth)
			.attr('height', containerHeight)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Create scales
		const xScale = d3
			.scaleBand()
			.domain(data.map((d) => d.label))
			.range([0, chartWidth])
			.padding(0.2);

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value) || 0])
			.nice()
			.range([chartHeight, 0]);

		// Add X axis
		svg
			.append('g')
			.attr('transform', `translate(0,${chartHeight})`)
			.call(d3.axisBottom(xScale))
			.selectAll('text')
			.style('font-size', '12px')
			.style('fill', '#6b7280')
			.attr('transform', 'rotate(-45)')
			.style('text-anchor', 'end');

		// Add Y axis
		svg
			.append('g')
			.call(
				d3
					.axisLeft(yScale)
					.ticks(5)
					.tickFormat((d) => d3.format('~s')(d as number))
			)
			.selectAll('text')
			.style('font-size', '12px')
			.style('fill', '#6b7280');

		// Add grid lines
		svg
			.append('g')
			.attr('class', 'grid')
			.attr('opacity', 0.1)
			.call(
				d3
					.axisLeft(yScale)
					.ticks(5)
					.tickSize(-chartWidth)
					.tickFormat(() => '')
			);

		// Add bars
		svg
			.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', (d) => xScale(d.label) || 0)
			.attr('y', chartHeight)
			.attr('width', xScale.bandwidth())
			.attr('height', 0)
			.attr('fill', color)
			.attr('rx', 4)
			.style('cursor', 'pointer')
			.on('mouseenter', function (event, d) {
				d3.select(this).transition().duration(200).attr('opacity', 0.8);

				// Show tooltip
				const tooltip = d3.select(containerRef.current).select('.tooltip');
				if (tooltip.empty()) {
					d3.select(containerRef.current)
						.append('div')
						.attr('class', 'tooltip')
						.style('position', 'absolute')
						.style('background', 'rgba(0, 0, 0, 0.8)')
						.style('color', 'white')
						.style('padding', '8px 12px')
						.style('border-radius', '4px')
						.style('font-size', '12px')
						.style('pointer-events', 'none')
						.style('z-index', '1000');
				}

				d3.select(containerRef.current)
					.select('.tooltip')
					.style('opacity', 1)
					.html(`<strong>${d.label}</strong><br/>Value: ${d3.format(',.0f')(d.value)}`)
					.style('left', `${event.clientX - containerRef.current!.getBoundingClientRect().left + 10}px`)
					.style('top', `${event.clientY - containerRef.current!.getBoundingClientRect().top - 10}px`);
			})
			.on('mouseleave', function () {
				d3.select(this).transition().duration(200).attr('opacity', 1);
				d3.select(containerRef.current).select('.tooltip').style('opacity', 0);
			})
			.transition()
			.duration(800)
			.attr('y', (d) => yScale(d.value))
			.attr('height', (d) => chartHeight - yScale(d.value));
	}, [data, color, height]);

	return (
		<div ref={containerRef} className="relative w-full">
			<svg ref={svgRef} className="w-full"></svg>
		</div>
	);
};
