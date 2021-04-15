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
    <div className="">
      <form>
        <table className="w-screen">
          <thead>
            <tr>
              <th className="border-b-2">Tipo</th>
              <th className="border-b-2">Descripción</th>
              <th className="border-b-2">Monto</th>
            </tr>
          </thead>
          <tbody>
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
            <button
              className="px-2 py-1 bg-blue-500 motion-safe:hover:scale-110 text-white rounded-sm active:bg-blue-600 "
              onClick={addRow}
            >
              Añadir entrada
            </button>
          </tfoot>
        </table>
        {emptyValue && (
          <div className="text-error">
            <p>
              Porfavor llena todas las casillas anteriores para poder añadir una
              nueva entrada
            </p>
          </div>
        )}
        <div className="flex justify-around w-full">
          <button
            type="submit"
            value="Guardar"
            className="bg-blue-500 px-6 py-2 text-white rounded-sm mt-5"
            onClick={handleSubmit}
          >
            Guardar
          </button>
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
