import React, { createContext, useState } from 'react'
export const ThemeContext = createContext(null);
export default function ThemeContextProvider(props) {
    const initialState = {
        dark: { background: "#222831", color: "white", navBackground: "#393E46", icon: "" },
        light: { background: "white", color: "#222831", navBackground: "tomato", icon: "" },
        isDark: localStorage.isDark ? JSON.parse(localStorage.isDark) : false
    }

    const [theme, settheme] = useState(initialState);
    const toggleTheme = (status) => {
        settheme({ ...initialState, isDark: status });
        localStorage.isDark = status
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
