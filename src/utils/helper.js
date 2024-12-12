export function convertChartData(data, type) {
  return data[type].map(([date, price]) => ({
    date: new Date(date).getDate(),
    [type]: price,
  }));
}
