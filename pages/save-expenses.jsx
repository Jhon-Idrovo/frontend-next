import { useState } from "react";

import LogNeeded from "../components/LogNeeded";
import ExpRow from "../components/ExpRow";

import axiosInstance from "../axios";
import useI18n from "../hooks/useI18n";

const baseExpense = {
  expType: "",
  description: "",
  amount: "",
};
function SaveExpenses({ isLoged }) {
  const t = useI18n();
  const [expenses, setExpenses] = useState([
    JSON.parse(JSON.stringify(baseExpense)),
  ]);

  const [emptyValue, setEmptyValue] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkForEmpty()) {
      axiosInstance
        .post("api/save-expenses/", expenses)
        .then((res) => {
          if (res.status == 201) {
            setExpenses([{ ...baseExpense }]);
          } else throw Error;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const checkForEmpty = () => {
    const lastRow = expenses[expenses.length - 1];
    for (let prop in lastRow) {
      console.log(lastRow[prop]);
      if (!lastRow[prop]) {
        setEmptyValue(true);
        return true;
      }
    }
    setEmptyValue(false);
    return false;
  };

  const addRow = (e) => {
    e.preventDefault();
    //run verification of no empty values
    if (!checkForEmpty()) {
      setExpenses([...expenses, JSON.parse(JSON.stringify(baseExpense))]);
    }
  };
  const deleteRow = (e, index) => {
    e.preventDefault();
    let newArr = [...expenses];
    newArr.splice(index, 1);
    setExpenses(newArr);
  };
  const handleChange = (e, index, inputField) => {
    let oldExp = Object.assign([], expenses);

    oldExp[parseInt(index)][inputField] = e.target.value;
    setExpenses(oldExp);
  };

  if (!isLoged) return <LogNeeded />;
  return (
    <div className="">
      <form>
        <table className="w-screen">
          <thead>
            <tr>
              <th className="border-b-2">{t.saveExpenses.headers[0]}</th>
              <th className="border-b-2">{t.saveExpenses.headers[1]}</th>
              <th className="border-b-2">{t.saveExpenses.headers[2]}</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => {
              return (
                <ExpRow
                  handleChange={handleChange}
                  deleteRow={deleteRow}
                  exp={exp}
                  key={index}
                  index={index}
                />
              );
            })}
          </tbody>
          <tfoot>
            <button
              className="px-2 py-1 bg-blue-500 motion-safe:hover:scale-110 text-white rounded-sm active:bg-blue-600 "
              onClick={addRow}
            ></button>
          </tfoot>
        </table>
        {emptyValue && (
          <div className="text-error">
            <p>{t.saveExpenses.error}</p>
          </div>
        )}
        <div className="flex justify-around w-full">
          <button
            type="submit"
            value="Guardar"
            className="btn-base px-8 mt-3"
            onClick={handleSubmit}
          >
            {t.common.save}
          </button>
        </div>
      </form>
      <datalist id="expensesList">
        {Object.keys(t.saveExpenses.expensesList).map((optionVal, index) => (
          <option value={optionVal} hidden={index === 0}></option>
        ))}
      </datalist>
      {Object.keys(t.saveExpenses.expensesList).map((expType) => {
        <datalist id={expType}>
          {t.saveExpenses.expensesList[expType].map((optionVal) => {
            <option value={optionVal}></option>;
          })}
        </datalist>;
      })}
    </div>
  );
}

export default SaveExpenses;
