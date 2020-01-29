import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios';
import {BudgetReducer} from '../actions/BudgetsAction';
export const BudgetContext = createContext();

const BudgetContextProvider = props => {
    const initialState = {
        income: [],
        outcome: []
    }

    const [budgetState, dispatch] = useReducer(BudgetReducer, initialState);

    useEffect(() => {
        //Get The Income
        axios.get("/income")
            .then(res => {
                dispatch({ type: "GET_INCOME", payload: res.data })
            })
            .catch(err => console.log("Error:** ", err));
        //Get The Outcome
        axios.get("/outcome")
            .then(res => {
                dispatch({ type: "GET_OUTCOME", payload: res.data })
            })
            .catch(err => console.log("Error:** ", err));
    }, []);

    return (
        <BudgetContext.Provider value={{ budgetState, dispatch }}>
            {props.children}
        </BudgetContext.Provider>
    );
}

export default BudgetContextProvider