import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import styles from "./Chart.module.css";

import { convertChartData } from "../../utils/helper";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");
  function closeHandler(e) {
    setChart(null);
  }

  return (
    <div className={styles.container}>
      <span className={styles.closeBtn} onClick={closeHandler}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.info}>
          <img src={chart.image} alt={chart.name} />
          <span>{chart.name}</span>
        </div>
        <div className={styles.graph}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width="400px"
              height="400px"
              data={convertChartData(chart.data, type)}
            >
              <Line
                type="monotone"
                dataKey={type}
                stroke="#3874ff"
                strokeWidth="2px"
              />
              <XAxis dataKey="date" hide />
              <YAxis dataKey={type} domain={["auto", "auto"]} />
              <CartesianGrid stroke="#404042" strokeDasharray="1 1" />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.typeContainer}>
          <button onClick={() => setType("prices")}>Prices</button>
          <button onClick={() => setType("market_caps")}>Market Cap</button>
          <button onClick={() => setType("total_volumes")}>
            Total Volumes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chart;
