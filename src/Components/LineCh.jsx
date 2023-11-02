import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

function LineCh() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.children.length === 0) {
      var options = {
        chart: {
          height: 280,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            name: "Series 1",
            data: [45, 52, 38, 45, 19, 23, 2],
          },
        ],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
          },
        },
        xaxis: {
          categories: [
            "01 Jan",
            "02 Jan",
            "03 Jan",
            "04 Jan",
            "05 Jan",
            "06 Jan",
            "07 Jan",
          ],
        },
      };

      var chart = new ApexCharts(chartRef.current, options);
      chart.render();
    } else {
      console.log("Chart ref is null or already rendered");
    }
  }, []);

  return <div ref={chartRef}></div>;
}

export default LineCh;
