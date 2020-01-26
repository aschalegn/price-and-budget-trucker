import React from 'react';
import './App.css';
import BudgetContextProvider from "./contexts/budgetContext"
import AddbudgetAct from './components/AddbudgetAct';
import Home from './components/Home';
function App() {
  return (
    <section className="App">
      <BudgetContextProvider>
        <AddbudgetAct />
        <Home />
      </BudgetContextProvider>
    </section>
  );
}

export default App;
