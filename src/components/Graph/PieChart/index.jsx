import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ReactDOM from "react-dom";

const PieChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({
    series: [21, 11, 27, 67],
    labels: ["Pending", "Completed", "Canceled", "Total"],
    // options: {
    //   chart: {
    //     width: 380,
    //     type: "pie",
    //   },
    //   labels: ["Pending", "Completed", "Canceled", "Total"],
    //   colors: ["#005FD9", "#FFA84A", "#9B88ED", "#FB67CA"],
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200,
    //         },
    //         legend: {
    //           position: "bottom",
    //         },
    //       },
    //     },
    //   ],
    //   tooltip: {
    //     y: {
    //       formatter: (value) => value,
    //       title: {
    //         formatter: (seriesName) => seriesName,
    //       },
    //     },
    //   },
    // },
  });

  useEffect(() => {
    const orderStatusCount = [];
    const orderStatusNames = [];

    data?.orderStatus?.forEach((element) => {
      orderStatusCount.push(element.count);
      orderStatusNames.push(element._id);
    });

    setChartOptions((p) => ({
      series: orderStatusCount,
      labels: orderStatusNames,
    }));
  }, [data]);

  return (
    <div>
      <div id="chart">
        {chartOptions && (
          <ReactApexChart
            series={chartOptions.series}
            options={{
              chart: {
                width: 380,
                type: "pie",
              },
              labels: chartOptions.labels,
              colors: ["#005FD9", "#FFA84A", "#9B88ED", "#FB67CA"],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
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
            }}
            type="pie"
            className="w-100"
          />
        )}
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
