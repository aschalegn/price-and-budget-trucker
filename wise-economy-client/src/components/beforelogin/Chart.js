import React, { useRef, useEffect } from 'react'
import * as d3 from "d3";

const Chart = props => {
    const width = window.innerWidth
    const height = window.innerHeight
    const ptest = useRef(null);
    const chardiv = useRef(null)
    // useEffect(() => {
    //     if (ptest.current) {
    //         d3.select(chardiv.current)
    //             .append("svg")
    //             .attr("width", width * 0.3)
    //             .attr("height", height * 0.3)
                
    //     }
    // }, [])

    return (
        <div>
            <p ref={ptest}>this is the test</p>
            <div ref={chardiv}></div>
        </div>
    )
}

export default Chart