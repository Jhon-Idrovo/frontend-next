import { useState } from "react";

import LogNeeded from "../components/LogNeeded";
import ExpRow from "../components/ExpRow";

import axiosInstance from "../axios";

const baseExpense = {
  expType: "",
  description: "",
  amount: "",
};
function SaveExpenses({ isLoged }) {
  const [expenses, setExpenses] = useState([
    JSON.parse(JSON.stringify(baseExpense)),
  ]);

  const [emptyValue, setEmptyValue] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

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
  };

  const addRow = (e) => {
    e.preventDefault();
    //run verification of no empty values
    const lastRow = expenses[expenses.length - 1];
    for (let prop in lastRow) {
      console.log(lastRow[prop]);
      if (!lastRow[prop]) {
        setEmptyValue(true);
        return;
      }
    }
    setEmptyValue(false);
    setExpenses([...expenses, JSON.parse(JSON.stringify(baseExpense))]);
  };

  const handleChange = (e, index, inputField) => {
    let oldExp = Object.assign([], expenses);

    oldExp[parseInt(index)][inputField] = e.target.value;
    setExpenses(oldExp);
  };

  if (!isLoged) return <LogNeeded />;
  return (
    <div className="exp-container">
      <form id="expenses-form">
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="head-row">
              <th className="table-headers">Tipo</th>
              <th className="table-headers">Descripción</th>
              <th className="table-headers">Monto</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {expenses.map((exp, index) => {
              return (
                <ExpRow
                  handleChange={handleChange}
                  exp={exp}
                  key={index}
                  index={index}
                />
              );
            })}
          </tbody>
          <tfoot>
            <button id="add-btn" onClick={addRow}>
              Añadir fila
            </button>
          </tfoot>
        </table>
        {emptyValue && (
          <div id="empty-row-err">
            <p>
              Porfavor llena todas las casillas anteriores para poder añadir una
              nueva fila
            </p>
          </div>
        )}
        <div id="submit-container">
          <input
            type="submit"
            value="Guardar"
            onClick={handleSubmit}
            className="exp-submit-btn"
          />
        </div>
      </form>
      <datalist id="expensesList">
        <option value="Alimentación" hidden></option>
        <option value="Farmacia"></option>
        <option value="Servicios básicos"></option>
        <option value="Vestimenta"></option>
        <option value="Ocio(Entreteniemiento en general)"></option>
        <option value="Mascotas"></option>
        <option value="Donaciones"></option>
        <option value="Otros"></option>
      </datalist>
      <datalist id="Alimentación">
        <option className="Food" value="Carne"></option>
        <option className="Food" value="Legumbres"></option>
        <option className="Food" value="Huevos"></option>
        <option className="Food" value="Vegetales"></option>
        <option className="Food" value="Frutas"></option>
      </datalist>
      {/* <!--CLOTHING OPTIONS--> */}
      <datalist id="Vestimenta">
        <option value="Camisas/Blusas" className="Clothes"></option>
        <option value="Zapatos" className="Clothes"></option>
        <option value="Pantalones" className="Clothes"></option>
        <option value="Abrigos" className="Clothes"></option>
        <option value="Adornos" className="Clothes"></option>
      </datalist>
      {/* <!--BASIC SERVICES OPTIONS--> */}
      <datalist id="Servicios básicos">
        <option className="BasicServices" value="Agua Potable"></option>
        <option className="BasicServices" value="Energía Eléctrica"></option>
        <option className="BasicServices" value="Internet"></option>
        <option className="BasicServices" value="Gas"></option>
        <option className="BasicServices" value=""></option>
      </datalist>
      {/* <!--PETS OPTIONS--> */}
      <datalist id="Mascotas">
        <option value="Comida" className="Pets"></option>
        <option value="Accesorios" className="Pets"></option>
        <option value="Farmacia" className="Pets"></option>
      </datalist>
      {/* <!--LEISURE OPTIONS--> */}
      <datalist id="Ocio(Entreteniemiento en general)">
        <option value="Viajes" className="Leisure"></option>
        <option value="Películas" className="Leisure"></option>
        <option value="Videojuegos" className="Leisure"></option>
        <option value="Juguetes varios" className="Leisure"></option>
        <option value="" className="Leisure"></option>
      </datalist>
    </div>
  );
}

export default SaveExpenses;
