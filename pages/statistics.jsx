import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import LogNeeded from "../components/LogNeeded";
import axiosInstance from "../axios";
import ExpPercentages from "../components/ExpPercentages";
import I_E_P from "../components/I_E_P";

const options = {
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "$" + value;
          },
        },
      },
    ],
  },
  maintainAspectRatio: true,
};

let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");

const defaultDate = {
  init: `${year - 1}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`,
  end: `${year}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`,
};

function Statistics({ isLoged }) {
  const [data, setData] = useState(null);
  const [timeFrame, setTimeFrame] = useState(defaultDate);
  const [pie, setPie] = useState(false);
  useEffect(() => {
    submit();
  }, []);

  const submit = () => {
    axiosInstance.post("api/statistics/", timeFrame).then((response) => {
      setData(response.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const changeColors = (e) => {
    e.preventDefault();
    axiosInstance.post("api/change-colors/").then((response) => {
      console.log(response.status);
      submit();
    });
  };

  const handleAccordion = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  };
  if (!isLoged) return <LogNeeded />;

  return (
    <div>
      <div className="flex flex-col">
        <h4 className="graph-header">
          Monto acumulado por cada tipo de gasto por mes
        </h4>
        <Line data={data} options={options} />
        <form className="timeframe-form">
          <span className="">
            <span className="inline-block">
              <label htmlFor="initial-date" className="mx-2">
                Fecha Inicio
              </label>
              <input
                type="date"
                name="initial"
                id="initial-date"
                value={timeFrame.init}
                onChange={(e) => {
                  setTimeFrame({ ...timeFrame, init: e.target.value });
                }}
              />
            </span>
            <br className="sm:hidden" />
            <span className="inline-block">
              <label htmlFor="end-date" className="mx-2">
                Fecha Final
              </label>
              <input
                type="date"
                name="end"
                id="end-date"
                value={timeFrame.end}
                onChange={(e) => {
                  setTimeFrame({ ...timeFrame, end: e.target.value });
                }}
              />
            </span>
          </span>
          <span className="mr-2">
            <button
              className="btn-base h-full w-full"
              type="submit"
              onClick={handleSubmit}
              id="submit-btn"
            >
              Cargar
            </button>
          </span>
        </form>
        <button
          className="btn-base mt-2 self-center px-2"
          onClick={changeColors}
        >
          Generar nuevos colores
        </button>
      </div>
    </div>
  );
}

export default Statistics;

// return (
//   <div>
//     <Accordion defaultActiveKey="0">
//       <Card>
//         <Accordion.Toggle as={Card.Header} eventKey="0">
//           Click me!
//         </Accordion.Toggle>
//         <Accordion.Collapse eventKey="0">
//           <Card.Body>
//             <div>
//               <h4 className="graph-header">
//                 Monto acumulado por cada tipo de gasto por mes
//               </h4>
//               <Line data={data} options={options} />
//               <form className="stats-form">
//                 <span id="dates-container">
//                   <span className="date">
//                     <label htmlFor="initial-date">Fecha Inicio</label>
//                     <input
//                       type="date"
//                       name="initial"
//                       id="initial-date"
//                       value={timeFrame.init}
//                       onChange={(e) => {
//                         setTimeFrame({ ...timeFrame, init: e.target.value });
//                       }}
//                     />
//                   </span>
//                   <span className="date">
//                     <label htmlFor="end-date">Fecha Final</label>
//                     <input
//                       type="date"
//                       name="end"
//                       id="end-date"
//                       value={timeFrame.end}
//                       onChange={(e) => {
//                         setTimeFrame({ ...timeFrame, end: e.target.value });
//                       }}
//                     />
//                   </span>
//                 </span>
//                 <input
//                   type="submit"
//                   value="Cargar"
//                   onClick={handleSubmit}
//                   id="submit-btn"
//                 />
//               </form>
//               <button onClick={changeColors}>Generar nuevos colores</button>
//             </div>
//           </Card.Body>
//         </Accordion.Collapse>
//       </Card>
//     </Accordion>
//     <Accordion defaultActiveKey="0">
//       <Card>
//         <Accordion.Toggle as={Card.Header} eventKey="0">
//           Click me!
//         </Accordion.Toggle>
//         <Accordion.Collapse eventKey="0">
//           <Card.Body>Hello! I'm the body</Card.Body>
//         </Accordion.Collapse>
//       </Card>
//     </Accordion>
//     <Accordion defaultActiveKey="0">
//       <Card>
//         <Accordion.Toggle as={Card.Header} eventKey="0">
//           Click me!
//         </Accordion.Toggle>
//         <Accordion.Collapse eventKey="0">
//           <Card.Body>Hello! I'm the body</Card.Body>
//         </Accordion.Collapse>
//       </Card>
//     </Accordion>
//   </div>
// );
