import React, { useContext } from 'react'
import { BudgetContext } from "../contexts/budgetContext"
export default function Home() {
    const { budgetState } = useContext(BudgetContext);
    return (
        <div>
            <h1>This is the Page</h1>
            <h2>Income</h2>
            {budgetState.income.map(income =>
                <div key={income._id}>
                    <h1>{income.description}</h1>
                </div>
            )}
            <br/>
            <br/>
            <h2>Outcome</h2>
            {budgetState.outcome.map(outcome =>
                <div key={outcome._id}>
                    <h1>{outcome.description}</h1>
                </div>
            )}
        </div>
    );
}
