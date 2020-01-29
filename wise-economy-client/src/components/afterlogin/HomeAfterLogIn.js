import React from 'react';
import ListIncomeOutcome from './incomeOutcome/ListIncomeOutcome';
import AddbudgetAct from "./incomeOutcome/AddbudgetAct";
import HeaderAfterLog from './HeaderAfterLog';

export default function Home() {
    return (
        <div>
            <HeaderAfterLog />
            <AddbudgetAct />
            <ListIncomeOutcome />
        </div>
    );
}
