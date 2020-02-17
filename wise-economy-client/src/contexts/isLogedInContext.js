import React, { createContext, useEffect, useReducer } from 'react'
export const isLogedInContext = createContext(null);
const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload, isLogegedIn: true }
        case "LOGOUT_USER":
            return { ...state, user: {}, isLogegedIn: false }
        default:
            return state
    }
}

const IsLogedInContextProvider = props => {
    const initialstate = {
        isLogegedIn: false,
        user: {}
    }

    const [userStatus, userDispatch] = useReducer(userReducer, initialstate);
    useEffect(() => {
        if (document.cookie && localStorage.wiseUser) {
            userDispatch({ type: "LOGIN_USER", payload: JSON.parse(localStorage.wiseUser) })
        }
    }, []);

    return (
        <isLogedInContext.Provider value={{ userStatus, userDispatch }}>
            {props.children}
        </isLogedInContext.Provider>
    );
}

export default IsLogedInContextProvider;