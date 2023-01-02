import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import classes from './ExpenseForm.module.css';
import ExpenseItem from "./ExpenseItem";

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
        
         axios.post('https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json', {
            expenses
        }).then((res) => {
            console.log(res);
         }).catch((err) => {
            console.log(err.message);
         })
        
    };
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses))
        axios.get('https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json',{
            expenses
        }).then((res) => {
            console.log('Fetched Data', res.data);
        })
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
            <Row style={{textDecoration: "underline"}}>
                <Col>Expense Amount</Col>
                <Col>Expense Description</Col>
                <Col>Expense Category</Col>
            </Row>
            <Col>{expenses.length > 0 && <ExpenseItem expenses={expenses} />}</Col>
            <Col>{expenses.length < 1 && <div>No expenses are added Yet !!</div>}</Col>
         </Container>
        </section>
    )
};

export default ExpenseForm;