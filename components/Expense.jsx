function Expense({ exp }) {
  return (
    <>
      <tr className="border-b-2 border-blue-600">
        <td>{exp.date}</td>
        <td>{exp.exp_type}</td>
        <td>{exp.description}</td>
        <td>{exp.amount}</td>
      </tr>
    </>
  );
}

export default Expense;
