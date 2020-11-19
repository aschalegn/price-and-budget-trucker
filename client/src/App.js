import React from 'react';
import BudgetContextProvider from "./contexts/budgetContext"
import NavBar from './components/NavBar/NavBar';
import UserContextProvider from './contexts/userContext';
import TrackContextProvider from './contexts/trackCotext';
import ThemeContextProvider from './contexts/ThemeContext';

function App() {
    return (
        <section className="App">
            <ThemeContextProvider>
                <UserContextProvider>
                    <BudgetContextProvider>
                        <TrackContextProvider>
                            <NavBar />
                        </TrackContextProvider>
                    </BudgetContextProvider>
                </UserContextProvider>
            </ThemeContextProvider>
        </section>
    );
}

export default App;
