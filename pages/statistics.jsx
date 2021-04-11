import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";

import "../styles/statistics.module.css";
import LogNeeded from "../components/LogNeeded";
import axiosInstance from "../axios";

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

  useEffect(() => {
    submit();
  }, []);

  const submit = () => {
    axiosInstance.post("api/statistics/", timeFrame).then((response) => {
      let resData = {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [],
      };
      let series = response.data.series;
      series.forEach((serie) => {
        serie.backgroundColor =
          "#" +
          ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6);
      });
      resData.datasets = series;
      resData.labels = response.data.labels;
      setData(resData);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //submit();
  };

  if (!isLoged) return <LogNeeded />;
  return (
    <div>
      <h4 className="graph-header">
        Monto acumulado por cada tipo de gasto por mes
      </h4>
      {/* <Line data={data} options={options} /> */}
      <form className="stats-form">
        <span id="dates-container">
          <span className="date">
            <label htmlFor="initial-date">Fecha Inicio</label>
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
          <span className="date">
            <label htmlFor="end-date">Fecha Final</label>
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
        <input
          type="submit"
          value="Cargar"
          onClick={handleSubmit}
          id="submit-btn"
        />
      </form>
    </div>
  );
}

export default Statistics;
