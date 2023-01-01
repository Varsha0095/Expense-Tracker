import { useEffect, useRef, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import classes from './ExpenseForm.module.css';
import ExpenseItem from "./ExpenseItem";
import ExpenseList from "./ExpenseList";

const fetchingDatafromLocalStorage = () => {
    const data = localStorage.getItem('expenses');
    if(data){
        return JSON.parse(data);
    }else{
        return [];
    }
}
const ExpenseForm = (props) => {
    const expenseAmountInputRef = useRef();
    const expenseDescriptionInputRef = useRef();
    const expenseCategoryInputRef = useRef();

    const [expenses, setExpenses] = useState(fetchingDatafromLocalStorage());

    const addExpenseHandler = (event) => {
        event.preventDefault();

        const enteredAmount = expenseAmountInputRef.current.value;
        const enteredDescription = expenseDescriptionInputRef.current.value;
        const enteredCategory = expenseCategoryInputRef.current.value;

        let expenseObj = {
            enteredAmount,
            enteredDescription,
            enteredCategory
        }
        setExpenses([...expenses, expenseObj]);
        // localStorage.setItem(expenseObj.enteredDescription, JSON.stringify(expenseObj));
        // let expense_deserialized = JSON.parse(localStorage.getItem(expenseObj.enteredDescription));
        // console.log(expense_deserialized);
    };
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    },[expenses])


    return(
        <section>
        <form onSubmit={addExpenseHandler} className={classes.form}>
            <Row className={classes.control}>
                <Col><label htmlFor="amount">Expense Amount:</label></Col>
                <Col><input id="amount" type="number" ref={expenseAmountInputRef} /></Col>               
            </Row>
            <Row className={classes.control}>
            <Col><label htmlFor="description">Expense Description:</label></Col>
            <Col><input id="description" type="text" ref={expenseDescriptionInputRef} /></Col>
            </Row>
            <Row className={classes.control}>
            <Col><label htmlFor="category">Expense Category:</label></Col>
            <Col><select id="category" name="expense" ref={expenseCategoryInputRef}>
                <option value="fuel">Fuel</option>
                <option value="food">Food</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
                </select></Col>
            </Row>
            <div className={classes.actions}>
                <button>Add Expense</button>
            </div>
          </form>
         <Container className={classes.container}>
            {expenses.length > 0 && <ExpenseItem expenses={expenses} />}
            {expenses.length < 1 && <ExpenseList />}
         </Container>
        </section>
    )
};

export default ExpenseForm;