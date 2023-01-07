import axios from "axios";
import { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import classes from './ExpenseForm.module.css';
import ExpenseItem from "./ExpenseItem";

// const fetchingDatafromLocalStorage = () => {
//     const data = localStorage.getItem('expenses');
//     if(data){
//         return JSON.parse(data);
//     }else{
//         return [];
//     }
// }
const ExpenseForm = (props) => {
    const expenseAmountInputRef = useRef();
    const expenseDescriptionInputRef = useRef();
    const expenseCategoryInputRef = useRef();

    const [expenses, setExpenses] = useState([]);

    const addExpenseHandler = async(event) => {
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
        let email = localStorage.getItem('email');
        let mail = email.replace('@','').replace('.','');

        const res = await axios.post(`https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}.json`, expenseObj)
        console.log("res",res);

        if(res.status === 200){
            alert('Expense stored in database')

            const expense = {
                id: res.data.name,
                ...expenseObj,
            }
            console.log(expense);
        }else{
            console.log('something went wrong')
        }
        
    };
    const editExpenseHandler = (id) => {
        // const enteredAmount = expenseAmountInputRef.current.value;
        // const enteredDescription = expenseDescriptionInputRef.current.value;
        // const enteredCategory = expenseCategoryInputRef.current.value;

        let expenseObj = {
            enteredAmount : expenseAmountInputRef.current.value,
            enteredDescription : expenseDescriptionInputRef.current.value,
            enteredCategory : expenseCategoryInputRef.current.value,
        }
        let email = localStorage.getItem('email');
        let mail = email.replace('@','').replace('.','');
        axios.put(`https://expense-tracker-b43a5-default-rtdb.firebaseio.com/expenses/${mail}/${id}.json`, expenseObj)
        .then((res) => {
            console.log('edited expense', res);
        }).catch((err) => {
            console.log('could not edit expense');
        })
      }
    // axios.get('https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json').then((res) => {
    //     console.log('Fetched Data', res.data);
    // })
    // useEffect(() => {
    //     localStorage.setItem('expenses', JSON.stringify(expenses))
    //     axios.get('https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json',{
    //         expenses
    //     }).then((res) => {
    //         console.log('Fetched Data', res.data);
    //     })
    // },[expenses])


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
         
            <Col><ExpenseItem expenses={expenses} onEdit={editExpenseHandler}/></Col>
            <Col>{expenses.length < 1 && <div>No expenses are added Yet !!</div>}</Col>
        </section>
    )
};

export default ExpenseForm;