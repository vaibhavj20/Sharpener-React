import "./ExpenseItem.css";

function ExpenseItem() {
  return (
    <div className="expense-item">
      <div>15 August 2023</div>
      <div className="expense-item__location">Delhi</div>
      <div>
        <h2 className="expense-item__description">Book</h2>
        <div className="expense-item__price">$10</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
