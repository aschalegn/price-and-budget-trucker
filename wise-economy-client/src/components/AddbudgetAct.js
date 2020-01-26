import React, { useContext, useState } from 'react';
import { BudgetContext } from "../contexts/budgetContext";

const AddbudgetAct = props => {
    const { budget, dispatch } = useContext(BudgetContext);
    const [formvalue, setformvalue] = useState({});

    const changeHandler = (e) => {
        setformvalue({ ...formvalue, [e.target.name]: e.target.value });
        console.log(formvalue)
    }

    const addtoBudget = () => {
        dispatch({ type: 'ADD_BUDGET', payload: { type: 'income', description: formvalue.description, amount: formvalue.amount } });
    }

    return (
        <section className="form">
            <form action="">
                <select name="type" id="type" onChange={changeHandler}>
                    <option value="income">+</option>
                    <option value="outcome">-</option>
                </select>
                <input type="text" id="description" name='description' placeholder="Add Description" onChange={changeHandler} autoComplete="off" required />
                <input type="number" id="amount" name='amount' autoComplete="off" onChange={changeHandler} placeholder="Value" required />
                <i className="far fa-check-circle" onClick={addtoBudget}>Add</i>
            </form>
            <h1>{budget.length}</h1>
        </section>
    );
}

export default AddbudgetAct