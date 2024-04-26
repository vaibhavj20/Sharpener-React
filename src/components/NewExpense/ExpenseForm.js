import React, { useState } from "react";
import "./ExpenseForm.css";

const userEnteredDetails={
  enteredTitle="",
  enteredAmount="",
  enteredDate="",
  
};

const ExpenseForm = () => {
 const [userInput,setUserInput]=useState(userEnteredDetails);
  const titleChangeHandler = (event) => {
   // setUserInput({
   //   ...userInput,
   //   enteredTitle=event.target.value,
   // });
    setUserInput((prevState)=>{
      return{
        ...userInput,
        enteredTitle=event.target.value,
       }
    });
  };

  const amountChangeHandler = (event) => {
   //  setUserInput({
   //   ...userInput,
   //   enteredAmount=event.target.value,
   // });
      setUserInput((prevState)=>{
      return{
        ...userInput,
        enteredAmount = event.target.value,
       }
    });
  };

  const dateChangeHandler = (event) => {
   // setUserInput({
   //   ...userInput,
   //   enteredDate=event.target.value,
   // });
      setUserInput((prevState)=>{
      return{
        ...userInput,
        enteredDate = event.target.value,
       }
    });
  };

  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" onChange={amountChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            min="2023-01-01"
            max="2024-12-31"
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
