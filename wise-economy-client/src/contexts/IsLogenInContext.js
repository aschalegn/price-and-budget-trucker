import React, { useState, createContext } from 'react'
IsLogenInContext = createContext();

const IsLogenInContextProvider = props => {

    return (
        <IsLogenInContext.Provider>
            {props.children}
        </IsLogenInContext.Provider>
    )
}

export default IsLogenInContextProvider;