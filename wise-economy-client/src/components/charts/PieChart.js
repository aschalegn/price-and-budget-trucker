import React, { useRef, useEffect, useContext } from 'react'
import * as d3 from "d3";
import { BudgetContext } from '../../contexts/budgetContext';

const Chart = props => {
    const width = 400;
    const height = 400;
    const r = 100;
    const chartSection = useRef(null);
    const data = [
        { "label": "income", sum: props.INCOM_SUM },
        { "label": "outcome", sum: props.OUTCOME_SUM },
    ]

    if (chartSection.current) {
        const color = d3.scaleOrdinal()
            .range(["red", "blue", "orange"])
        const svg = d3.select(chartSection.current)
            .attr("width", width)
            .attr("height", height);

        const grouop = svg.append("g")
            .attr("transform", "translate(200, 200)");

        const arc = d3.arc()
            .innerRadius(50)
            .outerRadius(r);

        const pie = d3.pie()
            .value(d => { return d.sum });

        const arcs = grouop.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (d) => { return color(d.data) })

        console.log(pie(data));

    }

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

    const INCOM_SUM = calculateSum(budgetState.income);
    const OUTCOME_SUM = calculateSum(budgetState.outcome);
    // useEffect(()=>{
    //     INCOM_SUM = calculateSum(budgetState.income);
    //    OUTCOME_SUM = calculateSum(budgetState.outcome);
    // },[]);




    return (
        <section >
            <Chart INCOM_SUM={INCOM_SUM} OUTCOME_SUM={OUTCOME_SUM} />
        </section>
    )
}
