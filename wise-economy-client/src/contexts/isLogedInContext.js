import React, { createContext, useEffect, useReducer } from 'react'
export const isLogedInContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.paylod, isLogegedIn: true }
        case "LOGOUT_USER":
            return { ...state, user: {}, isLogegedIn: false }
        default:
            return state
    }
}

const IsLogedInContextProvider = props => {
    const initialstate = {
        isLogegedIn: true,
        user: {}
    }

    const [userStatus, dispatch] = useReducer(userReducer, initialstate);

    // useEffect(() =>
    //     document.cookie ? dispatch({ type: "LOGIN_USER", paylod: JSON.parse(localStorage.user) }) : ''
    //     , []);
    return (
        <isLogedInContext.Provider value={{ userStatus, dispatch }}>
            {props.children}
        </isLogedInContext.Provider>
    );
}

export default IsLogedInContextProvider;