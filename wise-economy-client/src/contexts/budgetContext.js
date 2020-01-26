import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios';
export const BudgetContext = createContext();

const BudgetReducer = (state, action) => {
    switch (action.type) {
        case "GET_INCOME":
            state = { ...state, income: action.payload }
            return state
        case "ADD_INCOME":
            console.log(state.income)
            state = { ...state, income: action.payload }
            console.log(state.income)
            return state
        case "GET_OUTCOME":
            state = { ...state, outcome: action.payload }
            return state
        case "ADD_OUTCOME":
            state = { ...state, outcome: action.payload }
            return state
        case "UPDATE_BUDGET":
            return "Updated"
        default:
            return "state";
    }
}

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
    )
}

export default BudgetContextProvider