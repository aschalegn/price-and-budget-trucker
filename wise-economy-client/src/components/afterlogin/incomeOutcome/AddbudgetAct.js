import React, { useContext, useState } from 'react';
import { BudgetContext } from "../../../contexts/budgetContext";
import axios from 'axios';
import "../../css/AddbudgetAct.css";
const AddbudgetAct = () => {
    const { dispatch } = useContext(BudgetContext);
    const [formvalue, setformvalue] = useState({ type: "INCOME", category: "general", _id: (JSON.parse(localStorage.wiseUser))._id });

    const changeHandler = (e) => {
        setformvalue({ ...formvalue, [e.target.name]: e.target.value });
    }

    const addtoBudget = () => {
        axios.post(`${formvalue.type}`, formvalue)
            .then(res => {
                if (res.status === 201) {
                    dispatch({ type: `ADD_${formvalue.type}`, payload: res.data });
                }
            })
            .catch(err => console.log("Error:***  ", err));
    }

    return (
        <section className="AddbudgetAct">
            <form>
                <label>Choose Type: </label>
                <select name="type" id="type" onChange={changeHandler}>
                    <option value="INCOME" defaultValue>+</option>
                    <option value="OUTCOME">-</option>
                </select>
                <input type="text" id="description" name='description' placeholder="Add Description" onChange={changeHandler} autoComplete="on" required /> 
                <input type="number" id="amount" name='amount' autoComplete="off" onChange={changeHandler} placeholder="Value" required />
                <select name="category" id="category" onChange={changeHandler}>
                    <option value="general" defaultValue>General</option>
                    <option value="entaertaiment">Entertaiment</option>
                    <option value="food">Food</option>
                    <option value="clothing">Clothing</option>
                    <option value="transportation">Transportation</option>
                    <option value="education">Education</option>
                </select>
                <i className="far fa-check-circle" onClick={addtoBudget}></i>
            </form>
        </section>
    );
}

export default AddbudgetAct