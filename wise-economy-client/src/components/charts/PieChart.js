import React, { useRef, useEffect, useContext } from 'react'
import * as d3 from "d3";
import { BudgetContext } from '../../contexts/budgetContext';


export default function PieChart() {
    const width = 400;
    const height = 400;
    const r = 100
    const chartSection = useRef(null);
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

    const data = [
        { "label": "income", sum: INCOM_SUM },
        { "label": "outcome", sum: OUTCOME_SUM },
    ]

    useEffect(() => {
        if (chartSection.current) {
            const svg = d3.select(chartSection.current)
                .append("svg")
                .attr("viewBox", [-width / 2, -height / 2, width, height]);
        }
    }, [])

    return (
        <section >
            <svg ref={chartSection}>

            </svg>
        </section>
    )
}
