import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios';
import { BudgetReducer } from '../actions/BudgetsAction';
export const BudgetContext = createContext();

const BudgetContextProvider = props => {
    const initialState = {
        incomes: [],
        outcomes: []
    }
    const [budgetState, dispatch] = useReducer(BudgetReducer, initialState);

    useEffect(() => {
        //Get The Income
        if (document.cookie && localStorage.wiseUser) {
            axios.get("/income").then(res => {
                if (res.status === 200) {
                    dispatch({ type: "GET_INCOME", payload: res.data })
                }
            });

            //Get The Outcome
            axios.get("/outcome").then(res => {
                if (res.status === 200) {
                    dispatch({ type: "GET_OUTCOME", payload: res.data })
                }
            });
        }
    }, []);

    return (
        <BudgetContext.Provider value={{ budgetState, dispatch }}>
            {props.children}
        </BudgetContext.Provider>
    );
}

export default BudgetContextProvider