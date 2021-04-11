import { useState, useEffect } from "react";
import Layout from "../components/Layout";

import axiosInstance from "../axios";
import NoExpenses from "../components/NoExpenses";
import Error from "../components/Error";
import "../styles/book.module.css";
import LogNeeded from "../components/LogNeeded";
import Loading from "../components/Loading";

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
    <Layout>
      <table className="book-table">
        <thead className="exp-show-thead">
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
    </Layout>
  );
}

export default ExpensesList;
