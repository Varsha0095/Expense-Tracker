import { Row, Col } from "react-bootstrap";

const ExpenseItem = ({expenses}) => {
    return expenses.map((expense) => (
        <>
        <Row>
            <Col>Rs.{expense.enteredAmount}</Col>
            <Col>{expense.enteredDescription}</Col>
            <Col>{expense.enteredCategory}</Col>
        </Row>
        </>
        // <ul>
        //     <li key={expense.enteredDescription}>{expense.enteredAmount}</li>
        //     <li>{expense.enteredDescription}</li>
        //     <li>{expense.enteredCategory}</li>
        // </ul>
    ))
}
export default ExpenseItem;