import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const Linechart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    let datacopy = [["Date", "Price"]];
    if (historicalData?.prices) {
      historicalData.prices.forEach((item) => {
        const date = new Date(item[0]).toLocaleDateString();
        const price = item[1];
        datacopy.push([date, price]);
      });
      setData(datacopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      width="100%"
      height="400px"
      legendToggle
    />
  );
};

export default Linechart;
