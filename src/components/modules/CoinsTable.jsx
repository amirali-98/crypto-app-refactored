import { RotatingLines } from "react-loader-spinner";

import chartDown from "../../assets/chart-down.svg";
import chartUp from "../../assets/chart-up.svg";

import { chartCoin } from "../../services/cryptoApi";

import styles from "./CoinsTable.module.css";

function CoinsTable({ coins, isLoading, currency, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines
          height="100"
          width="100"
          strokeColor="#3874ff"
          strokeWidth="1"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24H</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map(coin => (
              <CoinRow
                key={coin.id}
                coin={coin}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function CoinRow({
  coin: {
    id,
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  },
  currency,
  setChart,
}) {
  function chartHandler() {
    fetch(chartCoin(id))
      .then(res => res.json())
      .then(json => setChart({ data: json, image, symbol, name }))
      .catch(err => console.log(err));
  }

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={chartHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        <span>
          {currency === "usd" && "$"}
          {currency === "eur" && "€"}
          {currency === "jpy" && "¥"}
        </span>
        <span>{current_price.toLocaleString()}</span>
      </td>
      <td className={price_change > 0 ? styles.up : styles.down}>
        {price_change.toFixed(2)}%
      </td>
      <td>
        <span>
          {currency === "usd" && "$"}
          {currency === "eur" && "€"}
          {currency === "jpy" && "¥"}
        </span>
        <span>{total_volume.toLocaleString()}</span>
      </td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt="ChartIcon" />
      </td>
    </tr>
  );
}

export default CoinsTable;
