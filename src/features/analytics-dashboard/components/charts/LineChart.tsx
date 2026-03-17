import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LineChartData } from '../../types/chart';

interface LineChartProps {
	data: LineChartData;
	width?: number;
	height?: number;
}

export const LineChart = ({ data, width = 600, height = 300 }: LineChartProps) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!svgRef.current || !containerRef.current || data.points.length === 0) return;

		const renderChart = () => {
			// Get container dimensions for responsiveness
			const containerWidth = containerRef.current!.clientWidth;
			const containerHeight = height;

			// Clear previous chart
			d3.select(svgRef.current).selectAll('*').remove();

			// Set up margins and dimensions
			const margin = { top: 20, right: 30, bottom: 40, left: 60 };
			const chartWidth = containerWidth - margin.left - margin.right;
			const chartHeight = containerHeight - margin.top - margin.bottom;

			// Create SVG
			const svg = d3
				.select(svgRef.current)
				.attr('width', containerWidth)
				.attr('height', containerHeight)
				.append('g')
				.attr('transform', `translate(${margin.left},${margin.top})`);

			// Parse dates and create scales
			const parseDate = d3.timeParse('%Y-%m-%d');
			const parsedData = data.points.map((d) => ({
				date: parseDate(d.date) || new Date(),
				value: d.value,
			}));

			const lineColor = data.color || '#3b82f6';

			const xScale = d3
				.scaleTime()
				.domain(d3.extent(parsedData, (d) => d.date) as [Date, Date])
				.range([0, chartWidth]);

			const yScale = d3
				.scaleLinear()
				.domain([0, d3.max(parsedData, (d) => d.value) || 0])
				.nice()
				.range([chartHeight, 0]);

			// Create line generator
			const line = d3
				.line<{ date: Date; value: number }>()
				.x((d) => xScale(d.date))
				.y((d) => yScale(d.value))
				.curve(d3.curveMonotoneX);

			// Add X axis
			svg
				.append('g')
				.attr('transform', `translate(0,${chartHeight})`)
				.call(
					d3
						.axisBottom(xScale)
						.ticks(6)
						.tickFormat(d3.timeFormat('%b %d') as any)
				)
				.selectAll('text')
				.style('font-size', '12px')
				.style('fill', '#6b7280');

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

			// Add the line path
			svg
				.append('path')
				.datum(parsedData)
				.attr('fill', 'none')
				.attr('stroke', lineColor)
				.attr('stroke-width', 2.5)
				.attr('d', line);

			// Add dots
			svg
				.selectAll('.dot')
				.data(parsedData)
				.enter()
				.append('circle')
				.attr('cx', (d) => xScale(d.date))
				.attr('cy', (d) => yScale(d.value))
				.attr('r', 3)
				.attr('fill', lineColor)
				.attr('stroke', 'white')
				.attr('stroke-width', 2)
				.style('cursor', 'pointer')
				.on('mouseenter', function (event, d) {
					d3.select(this).transition().duration(200).attr('r', 6);

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
							.style('z-index', '1000')
							.style('transform', 'translate(-50%, -100%)')
							.style('white-space', 'nowrap');
					}

					const pointX = xScale(d.date) + margin.left;
					const pointY = yScale(d.value) + margin.top;

					d3.select(containerRef.current)
						.select('.tooltip')
						.style('opacity', 1)
						.html(`<strong>${d3.timeFormat('%b %d, %Y')(d.date)}</strong><br/>Value: ${d3.format(',.0f')(d.value)}`)
						.style('left', `${pointX}px`)
						.style('top', `${pointY - 8}px`);
				})
				.on('mouseleave', function () {
					d3.select(this).transition().duration(200).attr('r', 3);
					d3.select(containerRef.current).select('.tooltip').style('opacity', 0);
				});
		};

		renderChart();

		const resizeObserver = new ResizeObserver(() => {
			renderChart();
		});

		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [data, height]);

	return (
		<div ref={containerRef} className="relative h-full w-full">
			<svg ref={svgRef} className="w-full"></svg>
		</div>
	);
};
