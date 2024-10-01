import React from "react";

const Analytics = ({allTransaction}) => {
    const totalTransaction = allTransaction.length;
    const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === 'income')
    const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === 'expense')
    return(
        <div>
            <h1>Analytics</h1>
        </div>
    )
}

export default Analytics;