import React from 'react';
import BudgetContextProvider from "./contexts/budgetContext"
import NavBar from './components/NavBar/NavBar';
import IsLogedInContextProvider from './contexts/isLogedInContext';
import TrackContextProvider from './contexts/trackCotext';
import ThemeContextProvider from './contexts/ThemeContext';

function App() {
    return (
        <section className="App">
            <ThemeContextProvider>
                <IsLogedInContextProvider>
                    <BudgetContextProvider>
                        <TrackContextProvider>
                            <NavBar />
                        </TrackContextProvider>
                    </BudgetContextProvider>
                </IsLogedInContextProvider>
            </ThemeContextProvider>
        </section>
    );
}

export default App;
