import React, { useContext } from 'react';
import { BudgetContext } from "../../../contexts/budgetContext";
import axios from 'axios';
import './ListIncomeOutcome.css'
const ListIncomeOutcome = props => {
    const { budgetState, budgetDispatch } = useContext(BudgetContext);
    const deleteItem = (type, id) => {
        axios.delete(`${type}/${id}`)
            .then(res =>
                res.status === 202 ?
                    budgetDispatch({ type: `DELETE_${type}`, payload: res.data }) :
                    ''
            ).catch("");
    }

    return (
        <section className="ListIncomeOutcome">
            <section>
                <h1 className="title">Income</h1>
                {budgetState.incomes.map(income =>
                    <div key={income._id} className="item_container">
                        <h3>{income.description}</h3>
                        <h3 style={{ marginLeft: '30%' }}>{income.amount}</h3>
                        <h2 onClick={() => deleteItem("INCOME", income._id)} >&#10007;</h2>
                    </div>
                )}
            </section>
            <section>
                <h1 className="title">Outcome</h1>
                {budgetState.outcomes.map(outcome =>
                    <div key={outcome._id} className="item_container">
                        <h3>{outcome.description}</h3>
                        <h3 style={{ marginLeft: '30%' }}>{outcome.amount}</h3>
                        <h2 onClick={() => deleteItem("OUTCOME", outcome._id)} >&#10007;</h2>
                    </div>
                )}
            </section>
        </section>
    );
}

export default ListIncomeOutcome