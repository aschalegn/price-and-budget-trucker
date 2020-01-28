import React from 'react';
import BudgetContextProvider from "./contexts/budgetContext"
import Home from './components/Home';
function App() {
  return (
    <section className="App">
      <BudgetContextProvider>
        <Home />
      </BudgetContextProvider>
    </section>
  );
}

export default App;
