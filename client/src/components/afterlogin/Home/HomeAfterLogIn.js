import React from 'react';
import ListIncomeOutcome from '../incomeOutcome/ListIncomeOutcome';
import AddbudgetAct from "../incomeOutcome/AddbudgetAct";
import HeaderAfterLog from '../Header/HeaderAfterLog';
// import PieChart from '../charts/PieChart';

export default function Home() {
    return (
        <div>
            <HeaderAfterLog />
            <AddbudgetAct />
            {/* <PieChart /> */}
            <ListIncomeOutcome />
        </div>
    );
}
