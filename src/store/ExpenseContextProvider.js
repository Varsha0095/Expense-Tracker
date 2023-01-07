import React, { useEffect, useState } from "react";
import ExpenseContext from "./ExpenseContext";
import axios from "axios";

const ExpenseContextProvider = (props) => {
  const [expenseList, setExpenseList] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  //firebase backend
  const url = `https://expense-tracker-b43a5-default-rtdb.firebaseio.com`;

  //fetch details after every reload
  useEffect(() => {
    const getExpenses = async () => {
      const res = await axios.get(`${url}/expenses/expense.json`);
      if (res.status === 200) {
        const data = res.data;
        let expense_List = [];
        let expense_total_amount = 0;

        for (const key in data) {
          const expObj = {
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          };
          expense_List.push(expObj);
        }
        expense_List.forEach(
          (expense) => (expense_total_amount += +expense.amount)
        );
        console.log(expense_total_amount);
        setTotalAmt(expense_total_amount);
        setExpenseList(expense_List);
      } else {
        alert("Unable to fetch data");
      }
    };
    getExpenses();
  }, [url]);

  //adding expenses
  const addExpenseHandler = async (expense) => {
    //update expense details in firebase
    const res = await axios.post(`${url}/expenses/expense.json`, expense);
    console.log("result", res);
    if (res.status === 200) {
      alert("Expense stored successfully!");
      const expObj = {
        id: res.data.name,
        ...expense,
      };
      setExpenseList((expenseList) => [...expenseList, expObj]);
      setTotalAmt((totalAmt) => (totalAmt += +expense.amount));
    } else {
      alert("Error storing expense");
    }
  };

  //deleting expenses
  const deleteExpenseHandler = async (expenseToDelete, screen_only) => {
    if (!screen_only) {
      const res = await axios.delete(
        `${url}/expenses/expense/${expenseToDelete.id}.json`
      );
      if (res.status === 200) console.log("expense deleted successfully");
    }
  };

  //edit expense
  const editExpenseHandler = async (expenseToEdit) => {
    const res = await axios.put(
      `${url}/expenses/expense/${expenseToEdit.id}.json`,
      expenseToEdit
    );
    if(res.status === 200) console.log('expense edited successfully')
    //update total amount of expenses
        setExpenseList([...expenseList, expenseToEdit]);
        setTotalAmt((total) => total += +expenseToEdit.amount);
  };

  const expenseContextValue = {
    expenseList: expenseList,
    total: totalAmt,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    updateExpense: editExpenseHandler
  };
  return (
    <ExpenseContext.Provider value={expenseContextValue}>
        {props.children}
    </ExpenseContext.Provider>
  )
  
};

export default ExpenseContextProvider;
