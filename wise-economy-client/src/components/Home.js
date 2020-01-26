import React from 'react'
import { BudgetContext } from "../contexts/budgetContext"
export default function Home() {
    const { budget, dispach } = useContext(BudgetContext);
    return (
        <div>
            <h1>This is the Page</h1>
            {budget.map(budget =>
                <div>
                    
                </div>
            )}
        </div>
    )
}
