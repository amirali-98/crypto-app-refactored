const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "&x_cg_demo_api_key=CG-eZkgTF9pPKFWBioyGfENnpdb";

export function getCoinList(page, currency) {
  return `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}${API_KEY}`;
}

export function searchCoin(query) {
  return `${BASE_URL}/search?query=${query}${API_KEY}`;
}

export function chartCoin(coidId) {
  return `${BASE_URL}/coins/${coidId}/market_chart?vs_currency=usd&days=7&interval=daily${API_KEY}`;
}
