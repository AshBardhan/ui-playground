import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { PieChartData, ChartDataPoint } from '../../types/chart';

interface PieChartProps {
	data: PieChartData;
	height?: number;
}

const defaultColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];

export const PieChart = ({ data, height = 300 }: PieChartProps) => {
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

			// Set up dimensions
			const radius = Math.min(containerWidth, containerHeight) / 2 - 40;

			// Create SVG
			const svg = d3
				.select(svgRef.current)
				.attr('width', containerWidth)
				.attr('height', containerHeight)
				.append('g')
				.attr('transform', `translate(${containerWidth / 2},${containerHeight / 2})`);

			// Create color scale
			const colorScale = d3
				.scaleOrdinal<string>()
				.domain(data.points.map((d) => d.label))
				.range(defaultColors);

			// Create pie layout
			const pie = d3
				.pie<ChartDataPoint>()
				.value((d) => d.value)
				.sort(null);

			// Create arc generator
			const arc = d3.arc<d3.PieArcDatum<ChartDataPoint>>().innerRadius(0).outerRadius(radius);

			const arcHover = d3
				.arc<d3.PieArcDatum<ChartDataPoint>>()
				.innerRadius(0)
				.outerRadius(radius + 10);

			// Draw pie slices
			const arcs = svg
				.selectAll('.arc')
				.data(pie(data.points))
				.enter()
				.append('g')
				.attr('class', 'arc')
				.style('cursor', 'pointer');

			arcs
				.append('path')
				.attr('d', arc)
				.attr('fill', (d) => d.data.color || colorScale(d.data.label))
				.attr('stroke', 'white')
				.attr('stroke-width', 2)
				.on('mouseenter', function (event, d) {
					d3.select(this).transition().duration(200).attr('d', arcHover(d));

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
						.html(`<strong>${d.data.label}</strong><br/>Value: ${d.data.value.toFixed(1)}%`)
						.style('left', `${event.clientX - containerRef.current!.getBoundingClientRect().left + 10}px`)
						.style('top', `${event.clientY - containerRef.current!.getBoundingClientRect().top - 10}px`);
				})
				.on('mouseleave', function (event, d) {
					d3.select(this).transition().duration(200).attr('d', arc(d));
					d3.select(containerRef.current).select('.tooltip').style('opacity', 0);
				})
				.transition()
				.duration(800)
				.attrTween('d', function (d) {
					const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
					return function (t) {
						return arc(interpolate(t)) || '';
					};
				});

			// Add labels
			arcs
				.append('text')
				.attr('transform', (d) => `translate(${arc.centroid(d)})`)
				.attr('text-anchor', 'middle')
				.attr('font-size', '12px')
				.attr('fill', 'white')
				.attr('font-weight', '600')
				.style('pointer-events', 'none')
				.text((d) => (d.data.value > 5 ? `${d.data.value.toFixed(1)}%` : ''));
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
		<div ref={containerRef} className="relative w-full flex items-center justify-center">
			<svg ref={svgRef} className="w-full"></svg>
		</div>
	);
};
