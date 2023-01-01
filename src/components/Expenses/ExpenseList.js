import React from "react";
import { Col, Row } from "react-bootstrap"

const ExpenseList = () => {
    return(
        <React.Fragment>
        <Row>
            <Col>Expense Amount</Col>
            <Col>Expense Description</Col>
            <Col>Expense Category</Col>
        </Row>
        <div>
            No expenses are added yet
        </div>
        </React.Fragment>
    )
}
export default ExpenseList;