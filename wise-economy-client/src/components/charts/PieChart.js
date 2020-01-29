import React from 'react'
import * as ds from "d3";

export default function PieChart() {
    const width = 400;
    const height = 400;
    const data = [5, 4, 9, 2, 7];

    let pie = d3.pie()(data);
    return (
       <svg height={height} with={width}>
           <g transform={`translate(${width/2},${height /2})`}>
        
           </g>
       </svg>
    )
}
