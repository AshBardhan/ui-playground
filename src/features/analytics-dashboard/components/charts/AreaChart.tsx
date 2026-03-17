import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AreaChartData } from '../../types/chart';

interface AreaChartProps {
	data: AreaChartData;
	width?: number;
	height?: number;
}

export const AreaChart = ({ data, width = 600, height = 300 }: AreaChartProps) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!svgRef.current || !containerRef.current || data.points.length === 0) return;

		const renderChart = () => {
			// Get container dimensions
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

			// Parse time strings (assuming format like "HH:MM")
			const parsedData = data.points.map((d) => {
				const [hours, minutes] = d.date.split(':').map(Number);
				const date = new Date();
				date.setHours(hours, minutes, 0, 0);
				return { date, value: d.value };
			});

			const areaColor = data.color || '#8b5cf6';

			// Create scales
			const xScale = d3
				.scaleTime()
				.domain(d3.extent(parsedData, (d) => d.date) as [Date, Date])
				.range([0, chartWidth]);

			const yScale = d3
				.scaleLinear()
				.domain([0, d3.max(parsedData, (d) => d.value) || 0])
				.nice()
				.range([chartHeight, 0]);

			// Create area generator
			const area = d3
				.area<{ date: Date; value: number }>()
				.x((d) => xScale(d.date))
				.y0(chartHeight)
				.y1((d) => yScale(d.value))
				.curve(d3.curveMonotoneX);

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
						.ticks(8)
						.tickFormat(d3.timeFormat('%H:%M') as any)
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

			// Create gradient
			const gradient = svg
				.append('defs')
				.append('linearGradient')
				.attr('id', `area-gradient-${areaColor.replace('#', '')}`)
				.attr('x1', '0%')
				.attr('y1', '0%')
				.attr('x2', '0%')
				.attr('y2', '100%');

			gradient.append('stop').attr('offset', '0%').attr('stop-color', areaColor).attr('stop-opacity', 0.6);

			gradient.append('stop').attr('offset', '100%').attr('stop-color', areaColor).attr('stop-opacity', 0.1);

			// Add the area
			svg
				.append('path')
				.datum(parsedData)
				.attr('fill', `url(#area-gradient-${areaColor.replace('#', '')})`)
				.attr('d', area);

			// Add the line on top
			svg
				.append('path')
				.datum(parsedData)
				.attr('fill', 'none')
				.attr('stroke', areaColor)
				.attr('stroke-width', 2)
				.attr('d', line);
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
		<div ref={containerRef} className="relative w-full">
			<svg ref={svgRef} className="w-full"></svg>
		</div>
	);
};
