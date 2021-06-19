import useI18n from "../hooks/useI18n";

function ExpRow({ handleChange, deleteRow, exp, index }) {
  const t = useI18n();
  return (
    <tr className="border-b-2 ">
      <td className=" exp-input w-2/5">
        <input
          type="text"
          list="expensesList"
          className="form-input"
          onChange={(e) => handleChange(e, e.target.name, "expType")}
          value={exp.expType}
          placeholder={t.saveExpenses.headers[0]}
          name={index}
        />
      </td>
      <td className=" exp-input w-2/5">
        <input
          className="form-input"
          type="text"
          value={exp.description}
          onChange={(e) => handleChange(e, e.target.name, "description")}
          placeholder={t.saveExpenses.headers[1]}
          name={index}
          list={exp.expType}
        />
      </td>
      <td className="exp-input w-1/5">
        <div className=" flex">
          <input
            className="border-2 w-full"
            type="number"
            value={exp.amount}
            onChange={(e) => handleChange(e, e.target.name, "amount")}
            placeholder="0.00"
            name={index}
          />
          <button className="" onClick={(e) => deleteRow(e, index)}>
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ExpRow;
