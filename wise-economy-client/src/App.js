import React from 'react';
import BudgetContextProvider from "./contexts/budgetContext"
import NavBar from './components/NavBar';
import IsLogenInContextProvider from './contexts/IsLogenInContext';
function App() {
  return (
    <section className="App">
      <BudgetContextProvider>
        <IsLogenInContextProvider>
          <NavBar />
        </IsLogenInContextProvider>
      </BudgetContextProvider>
    </section>
  );
}

export default App;
