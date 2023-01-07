import { useEffect, useState } from "react";
import classes from "./ExpenseItem.module.css";
import axios from "axios";

const ExpenseItem = (props) => {
  const [expenses, setExpenses] = useState([]);
  console.log(expenses);
  let email = localStorage.getItem("email");
  let mail = email.replace("@", "").replace(".", "");

  useEffect(() => {
    axios
      .get(
        `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}.json`
      )
      .then((res) => {
        console.log("fetched data", res.data);
        let expense = res.data;
        console.log(expense);
        let expenseArr = [];
        for (const key in expense) {
          expense[key].id = key;
          let item = expense[key];
          expenseArr.push(item);
          console.log(item);
        }

        console.log(expenseArr);
        setExpenses(expenseArr);
        // console.log(Object.values(expense));
        // const data = Object.values(expense);
        //     console.log(data[1],...data);
        //     setExpenses([data[1],...data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [mail]);

  const removeExpenseHandler = (id) => {

    // expenses.map((expense) => {
    //         let item = expense.id;
    //         console.log(item);
    // })
    axios
      .delete(
        `https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}/${id}.json`
      )
      .then((res) => {
        console.log('Expense deleted successfully');
      }).catch((err) => {
        console.log(err.message);
      })
  };


  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Expense Amount</th>
          <th>Expense Description</th>
          <th>Expense Category</th>
          <th>Delete Expense</th>
          <th>Edit Expense</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => {
          return (
            <tr key={expense.id}>
              <td>{expense.enteredAmount}</td>
              <td>{expense.enteredDescription}</td>
              <td>{expense.enteredCategory}</td>
              <td>
                <button
                  onClick={() => removeExpenseHandler(expense.id)}
                  className={classes.buttonDel}
                >
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => props.onEdit(expense.id)} className={classes.buttonEdit}>Edit</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default ExpenseItem;
