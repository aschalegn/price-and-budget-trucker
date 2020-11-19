import React, { createContext, useEffect, useReducer } from 'react'
export const userContext = createContext(null);
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

const UserContextProvider = props => {
    const initialstate = {
        isLogegedIn: false,
        user: {}
    }

    const [userStatus, userDispatch] = useReducer(userReducer, initialstate);
    useEffect(() => {
        if (document.cookie && localStorage.wiseUser) {
            userDispatch({ type: "LOGIN_USER", payload: JSON.parse(localStorage.wiseUser) })
        } else if (!document.cookie){}
    }, []);

    return (
        <userContext.Provider value={{ userStatus, userDispatch }}>
            {props.children}
        </userContext.Provider>
    );
}

export default UserContextProvider;