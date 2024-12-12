import { useEffect, useState } from "react";

import Search from "../modules/Search";
import CoinsTable from "../modules/CoinsTable";
import Pagination from "../modules/Pagination";
import Chart from "../modules/Chart";

import { getCoinList } from "../../services/cryptoApi";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    fetch(getCoinList(page, currency))
      .then(res => res.json())
      .then(json => {
        setCoins(json);
        setIsLoading(false);
      });
    return () => {
      setIsLoading(true);
    };
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <CoinsTable
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;
