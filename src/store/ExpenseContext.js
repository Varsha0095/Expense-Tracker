import React from "react";

const ExpenseContext = React.createContext({
    expenseList : [],
    // total: 0,
    addExpense: (expense) => {},
    deleteExpense: (id) => {},
    updateExpense: (id) => {},
})

export default ExpenseContext;