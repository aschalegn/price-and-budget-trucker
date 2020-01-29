import React, { useReducer, createContext, useEffect } from 'react'
export const IsLogenInContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            console.log(state)
            return { ...state, user: action.paylod, isLogenIn: true }
            
        case "LOGOUT_USER":
            return { state, user: {}, isLogenIn: false }
        default:
            return state
    }
}

const IsLogenInContextProvider = props => {
    const initialstate = {
        isLogenIn: false,
        user: {}
    }

    const [userStatus, dispatch] = useReducer(userReducer, initialstate);
    useEffect(() => 
        document.cookie ? dispatch({ type: "LOGIN_USER", paylod: JSON.parse(localStorage.user) }) : ''
    , []);

    return (
        <IsLogenInContext.Provider value={{ userStatus, dispatch }}>
            {props.children}
        </IsLogenInContext.Provider>
    );
}

export default IsLogenInContextProvider;