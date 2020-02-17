import React, { useContext} from 'react'
import "../css/HeaderAfterLog.css";
import { BudgetContext } from '../../contexts/budgetContext';

export default function HeaderAfterLog() {
    const { budgetState } = useContext(BudgetContext);  
    const calculateSum = (array) => {
        let sum = 0;
        array.map(element => {
            return sum += element.amount;
        });
        return sum
    }

    const INCOM_SUM = calculateSum(budgetState.incomes);
    const OUTCOME_SUM = calculateSum(budgetState.outcomes);
    const Total = INCOM_SUM - OUTCOME_SUM;

    let red_style = { color: "#c21010" }
    let green_style = { color: "#73c224" }

    return (
        <section className="HeaderAfterLog">
            <div>Budget Available for: month</div>
            <div>Current Budget: <h2 style={Total >= 0 ? green_style : red_style}>
                {Total}</h2></div>
            <div className="total_income">Total Income: <span>{INCOM_SUM}</span></div>
            <div className="total_outcome">Total Expences: <span>{OUTCOME_SUM}</span></div>
        </section>
    );
}
