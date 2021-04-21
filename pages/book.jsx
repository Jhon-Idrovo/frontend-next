import { useState, useEffect } from "react";

import axiosInstance from "../axios";
import NoExpenses from "../components/NoExpenses";
import Error from "../components/Error";

import LogNeeded from "../components/LogNeeded";
import Loading from "../components/Loading";
import Expense from "../components/Expense";
import ExportToExcel from "../components/ExportToExcel";

function ExpensesList({ isLoged }) {
  const [expenses, setExpenses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("api/all-expenses/")
      .then((response) => {
        if (response.status === 200) {
          setExpenses(response.data);
          setIsLoading(false);
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (!isLoged) return <LogNeeded />;
  if (isLoading) return <Loading />;

  try {
    //if we still have expenses of null something went wrong
    if (expenses.length === 0) return <NoExpenses />;
  } catch (error) {
    console.log(error);
    return <Error />;
  }
  return (
    <div>
      <button
        type="submit"
        className="btn-base px-2 mt-1"
        onClick={() => ExportToExcel(expenses, "data")}
      >
        Descargar datos en Excel
      </button>
      <table className="w-screen text-xs sm:text-base">
        <thead className="border-b-4 border-blue-600">
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody className="exp-show-tbody">
          {expenses.map((exp, index) => {
            return <Expense exp={exp} key={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExpensesList;
