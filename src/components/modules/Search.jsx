import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

import { searchCoin } from "../../services/cryptoApi";

import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    if (!text) {
      setCoins([]);
    }

    if (text.length > 2) {
      function search() {
        fetch(searchCoin(text), { signal: controller.signal })
          .then(res => res.json())
          .then(json => {
            if (json.coins) {
              setCoins(json.coins);
              setIsLoading(false);
            }
          })
          .catch(err => {
            if (err.name !== "AbortError") {
              console.log(err);
            }
          });
      }

      search(text);
    }
    return () => {
      controller.abort();
      setIsLoading(true);
    };
  }, [text]);

  function currencyHandler(e) {
    setCurrency(e.target.value);
  }

  function textHandler(e) {
    setText(e.target.value);
  }

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={text}
        placeholder="Search"
        onChange={textHandler}
      />
      <select value={currency} onChange={currencyHandler}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {text.length > 2 && !!coins.length && (
        <div className={styles.searchResult}>
          {isLoading ? (
            <RotatingLines
              height="50"
              width="50"
              strokeColor="#3874ff"
              strokeWidth="1"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <ul>
              {coins.map(coin => (
                <li key={coin.id}>
                  <span>
                    <img src={coin.thumb} alt={coin.name} />
                  </span>
                  <span>{coin.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
