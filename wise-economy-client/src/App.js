import React from 'react';
import './App.css';
import BudgetContextProvider from "./contexts/budgetContext"
import AddbudgetAct from './components/AddbudgetAct';
function App() {
  return (
    <section className="App">
      <BudgetContextProvider>
        <AddbudgetAct>
          
        </AddbudgetAct>
      </BudgetContextProvider>
      <h1>kjsliej</h1>
    </section>
  );
}

export default App;
