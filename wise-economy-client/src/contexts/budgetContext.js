import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios';
export const BudgetContext = createContext();

const BudgetReducer = (state, action) => {
    switch (action.type) {
        case "GET_BUDGET":
            state = action.payload
            return state
        case "ADD_BUDGET":
            state = "sdfhkl;dfkl"
            return state
        case "UPDATE_BUDGET":
            return "Updated"
        default:
            return "state";
    }
}

const BudgetContextProvider = props => {
    const [budget, dispatch] = useReducer(BudgetReducer, []);

    useEffect(() => {
        axios.get("/income")
            .then(res => {
                // dispatch({ type: "GET_BUDGET", payload: res.data })
            })
            .catch(err => console.log("Error:** ", err))
    }, []);

    return (
        <BudgetContext.Provider value={{ budget, dispatch }}>
            {props.children}
        </BudgetContext.Provider>
    )
}

export default BudgetContextProvider