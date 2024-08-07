function ExpRow({ handleChange, exp, index }) {
  return (
    <tr className="exp-row">
      <td className="type-entry">
        <input
          type="text"
          list="expensesList"
          onChange={(e) => handleChange(e, e.target.name, "expType")}
          value={exp.expType}
          placeholder="Tipo"
          name={index}
          style={{ width: "100%" }}
        />
      </td>
      <td className="description-entry">
        <input
          type="text"
          value={exp.description}
          onChange={(e) => handleChange(e, e.target.name, "description")}
          placeholder="Descripción"
          name={index}
          list={exp.expType}
          style={{ width: "100%" }}
        />
      </td>
      <td className="amount-entry">
        <input
          type="number"
          value={exp.amount}
          onChange={(e) => handleChange(e, e.target.name, "amount")}
          placeholder="0.00"
          name={index}
          style={{ width: "100%" }}
        />
      </td>
    </tr>
  );
}

export default ExpRow;
