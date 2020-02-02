import React, { useRef } from 'react'
import * as d3 from "d3";


export default function PieChart() {
    const width = 400;
    const height = 400;
    const chartSection = useRef(null);
    
    const projection = d3.geoEquirectangular()
        .center(0, 15)
        .scale([width / (2 * Math.PI)])
        .translate([width / 2, height / 2])
    const path = d3.geoPath()
        .projection(projection)
    const svg = d3.select(chartSection.current)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    return (
        <section >
            <svg ref={chartSection}>

            </svg>
        </section>
    )
}
