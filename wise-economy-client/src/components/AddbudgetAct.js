import React, { useContext, useState } from 'react';
import { BudgetContext } from "../contexts/budgetContext";
import axios from 'axios';

const AddbudgetAct = () => {
    const { dispatch } = useContext(BudgetContext);
    const [formvalue, setformvalue] = useState({});

    const changeHandler = (e) => {
        setformvalue({ ...formvalue, [e.target.name]: e.target.value });
        console.log(e.target.value);
    }

    const addtoBudget = () => {
        axios.post(`${formvalue.type}`, formvalue)
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data)
                    dispatch({ type: `ADD_${formvalue.type}`, payload: res.data  });
                }
            })
            .catch(err => console.log("Error:***  ", err));
    }
    return (
        <section className="form">
            <form onSubmit={addtoBudget}>
                <select name="type" id="type" onChange={changeHandler}>
                    <option value="INCOME" defaultValue>+</option>
                    <option value="OUTCOME">-</option>
                </select>
                <input type="text" id="description" name='description' placeholder="Add Description" onChange={changeHandler} autoComplete="on" required />
                <input type="number" id="amount" name='amount' autoComplete="off" onChange={changeHandler} placeholder="Value" required />
                <i className="far fa-check-circle" onClick={addtoBudget}>Add</i>
            </form>
        </section>
    );
}

export default AddbudgetAct