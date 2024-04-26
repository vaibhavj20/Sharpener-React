import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

function Expenses(props) {
  return (
    <div>
      {/* Map over the expenses array passed as a prop */}
      {props.expenses.map((expense) => (
        // Render the ExpenseItem component for each expense
        <ExpenseItem
          key={expense.id}
          date={expense.date}
          title={expense.title}
          price={expense.price}
        />
      ))}
    </div>
  );
}

export default Expenses;
