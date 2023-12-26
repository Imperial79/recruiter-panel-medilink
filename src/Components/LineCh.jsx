import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { dbObject } from "../Helper/Constants";

function LineCh() {
  const chartRef = useRef(null);
  const [monthList, setmonthList] = useState([]);
  const [recordList, setrecordList] = useState([]);

  async function fetchGraphData() {
    const response = await dbObject.get("/graph/fetch-analytics.php");
    if (!response.data.error) {
      // console.log(response.data.response);
      let temp1 = [];
      let temp2 = [];
      response.data.response.map((data, index) => {
        temp1.push(data.month_year);
        temp2.push(parseInt(data.record_count));
      });
      setmonthList(temp1);
      setrecordList(temp2);
      populateGraph();
    }
  }

  function populateGraph() {
    if (recordList.length > 0 && monthList.length > 0) {
      // if (chartRef.current && chartRef.current.children.length === 0) {
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
            data: recordList,
            color: "#1A56DB",
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
          categories: monthList,
        },
      };

      var chart = new ApexCharts(chartRef.current, options);
      chart.render();
    } else {
    }
  }

  useEffect(() => {
    fetchGraphData();
  }, []);

  useEffect(() => {
    console.log(monthList, recordList);
    if (chartRef.current && chartRef.current.children.length === 0) {
      populateGraph();
    }
  }, [monthList, recordList]);

  return <div ref={chartRef}></div>;
}

export default LineCh;
