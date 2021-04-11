function Expense({ exp }) {
  return (
    <>
      <tr className="exp-show-tr">
        <td>{exp.date}</td>
        <td>{exp.exp_type}</td>
        <td>{exp.description}</td>
        <td>{exp.amount}</td>
      </tr>
    </>
  );
}

export default Expense;
