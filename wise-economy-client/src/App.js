import React from 'react';
import BudgetContextProvider from "./contexts/budgetContext"
import NavBar from './components/NavBar';
import IsLogedInContextProvider from './contexts/isLogedInContext';
function App() {
    return (
        <section className="App">
            <BudgetContextProvider>
                <IsLogedInContextProvider>
                    <NavBar />
                </IsLogedInContextProvider>
            </BudgetContextProvider>
        </section>
    );
}

export default App;
