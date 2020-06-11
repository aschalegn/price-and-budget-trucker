import React, { useRef, useEffect, useContext } from 'react'
import * as d3 from "d3";
import { BudgetContext } from '../../contexts/budgetContext';

const Chart = props => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const r = 200;
    const chartSection = useRef(null);
    const data = [
        { "label": "income", sum: props.INCOM_SUM },
        { "label": "outcome", sum: props.OUTCOME_SUM },
    ]

    const draw = () => {
        if (chartSection.current) {
            const color = d3.scaleOrdinal().domain([data.label])
                .range(["#ff0022", "#2200ff"]);

            const svg = d3.select(chartSection.current)
                .attr("width", width * 0.5)
                .attr("height", height * 0.5);

            const grouop = svg.append("g")
                .attr("transform", "translate(300, 200)");

            const arc = d3.arc()
                .innerRadius(50)
                .outerRadius(r);

            const pie = d3.pie()
                .sort(null)
                .value(d => { return d.sum });

            const arcs = grouop.selectAll(".arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc");

            arcs.append("path")
                .attr("d", arc)
                .attr("fill", (d) => { return color(d.value) })
            arcs.append("text")
                .attr("transform", (d) => { return "translate(" + arc.centroid(d) + ")"; })
                .attr("text-anchor", "5rem")
                .text((d => { return d.data.label }))


        }
    }
    draw();
    useEffect(() => {
        draw();
    }, [])
    return (
        < svg ref={chartSection} >

        </svg >
    )
}


export default function PieChart() {
    const { budgetState } = useContext(BudgetContext);
    const calculateSum = (array) => {
        let sum = 0;
        array.forEach(element => {
            sum += element.amount
        });
        return sum
    }

    const INCOM_SUM = calculateSum(budgetState.incomes);
    const OUTCOME_SUM = calculateSum(budgetState.outcomes);
    const SUM = INCOM_SUM - OUTCOME_SUM;
    return (
        <section >
            <Chart INCOM_SUM={INCOM_SUM} OUTCOME_SUM={OUTCOME_SUM} />
        </section>
    )
}
