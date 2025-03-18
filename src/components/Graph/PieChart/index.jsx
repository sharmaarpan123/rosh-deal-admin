import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { orderStatusObj, orderStatusOptions } from "../../../utilities/const";

const PieChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
        width: "100%",
      },
      labels: [],
      colors: ["#005FD9", "#FFA84A", "#9B88ED", "#FB67CA"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      tooltip: {
        y: {
          formatter: (value) => value,
          title: {
            formatter: (seriesName) => seriesName,
          },
        },
      },
    },
  });

  useEffect(() => {
    if (data?.orderStatus) {
      const orderStatusCount = data.orderStatus.map((item) => item.count);
      const orderStatusNames = data.orderStatus.map(
        (item) => orderStatusObj[item._id] || ""
      );

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: orderStatusCount,
        options: {
          ...prevOptions.options,
          labels: orderStatusNames,
        },
      }));
    }
  }, [data]);

  return (
    <div id="chart">
      <ReactApexChart
        series={chartOptions.series}
        options={chartOptions.options}
        type="pie"
        className="w-100"
      />
    </div>
  );
};

export default PieChart;
